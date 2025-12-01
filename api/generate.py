"""AI 写真生成 API - Vercel Serverless Function"""
import re
import json
import base64
from http.server import BaseHTTPRequestHandler
from openai import OpenAI

DEFAULT_BASE_URL = "https://one-api.bltcy.top/v1"
MODEL_NAME = "nano-banana-2-4k"

STYLE_PROMPTS = {
    "professional": "Transform this person into a professional business portrait, elegant suit, confident pose, studio lighting, high-end corporate style, maintain facial features exactly",
    "artistic": "Transform this person into an artistic portrait photography, dramatic lighting, fine art style, museum quality, cinematic mood, maintain facial features exactly",
    "vintage": "Transform this person into a vintage film photography style, warm tones, grain texture, 1970s aesthetic, nostalgic atmosphere, maintain facial features exactly",
    "futuristic": "Transform this person into a futuristic cyberpunk portrait, neon lights, holographic effects, sci-fi aesthetic, high-tech atmosphere, maintain facial features exactly",
    "natural": "Transform this person into a natural outdoor portrait, soft golden hour lighting, fresh and clean look, botanical background, maintain facial features exactly",
    "glamour": "Transform this person into a high fashion glamour portrait, magazine cover quality, dramatic makeup, runway style, editorial lighting, maintain facial features exactly",
    "minimalist": "Transform this person into a minimalist portrait, clean white background, simple composition, elegant and refined, premium quality, maintain facial features exactly",
    "cinematic": "Transform this person into a cinematic portrait, movie-like color grading, dramatic composition, theatrical lighting, film noir influence, maintain facial features exactly"
}


def create_response(status_code, body):
    """创建标准响应"""
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        "body": json.dumps(body, ensure_ascii=False)
    }


def decode_base64_image(data_url):
    """解码 base64 图片数据"""
    if "," in data_url:
        header, data = data_url.split(",", 1)
        mime_type = header.split(":")[1].split(";")[0] if ":" in header else "image/png"
    else:
        data = data_url
        mime_type = "image/png"
    
    return base64.b64decode(data), mime_type


def generate_portrait(image_data, style_id, api_key, base_url, custom_prompt=None):
    """调用 AI 模型生成写真"""
    client = OpenAI(
        api_key=api_key,
        base_url=base_url or DEFAULT_BASE_URL
    )
    
    _, mime_type = decode_base64_image(image_data)
    
    prompt = custom_prompt if custom_prompt else STYLE_PROMPTS.get(style_id, STYLE_PROMPTS["professional"])
    prompt = f"{prompt}. Generate a high-quality portrait photo based on the uploaded image, preserving the person's identity and facial features while applying the requested style transformation."
    
    # Build image URL for OpenAI multimodal format
    image_url = image_data if "," in image_data else f"data:{mime_type};base64,{image_data}"
    
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": image_url}}
                ]
            }
        ]
    )
    
    # Extract image from response
    if response.choices and response.choices[0].message:
        content = response.choices[0].message.content
        
        # Handle multimodal response with image
        if hasattr(response.choices[0].message, 'content') and isinstance(content, list):
            for item in content:
                if isinstance(item, dict) and item.get("type") == "image_url":
                    return item["image_url"]["url"]
                if hasattr(item, 'image_url'):
                    return item.image_url.url
        
        if isinstance(content, str):
            # Handle base64 image in text content
            if content.startswith("data:image"):
                return content
            
            # Handle Markdown image syntax: ![alt](url)
            markdown_match = re.search(r'!\[.*?\]\((.*?)\)', content)
            if markdown_match:
                return markdown_match.group(1)
                
            # Handle raw URL if it looks like an image
            url_match = re.search(r'https?://[^\s)]+\.(?:jpg|jpeg|png|webp|gif)', content)
            if url_match:
                return url_match.group(0)

    raise Exception("模型未返回图片")


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        """处理 CORS 预检请求"""
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-API-Key, X-Base-URL")
        self.end_headers()

    def do_POST(self):
        """处理生成请求"""
        try:
            api_key = self.headers.get("X-API-Key", "")
            base_url = self.headers.get("X-Base-URL", DEFAULT_BASE_URL)
            
            if not api_key:
                self.send_json_response(401, {
                    "success": False,
                    "message": "请先配置 API Key"
                })
                return
            
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            data = json.loads(body.decode("utf-8"))
            
            image = data.get("image")
            style = data.get("style", "professional")
            prompt = data.get("prompt")
            
            if not image:
                self.send_json_response(400, {
                    "success": False,
                    "message": "请上传图片"
                })
                return
            
            generated_image = generate_portrait(image, style, api_key, base_url, prompt)
            
            self.send_json_response(200, {
                "success": True,
                "image": generated_image,
                "message": "生成成功"
            })
            
        except Exception as e:
            self.send_json_response(500, {
                "success": False,
                "message": f"生成失败: {str(e)}"
            })
    
    def send_json_response(self, status_code, data):
        """发送 JSON 响应"""
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))

