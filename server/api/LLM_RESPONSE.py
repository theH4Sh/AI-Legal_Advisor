import os
from dotenv import load_dotenv
import requests

load_dotenv()

def get_llm_response(message):
	api_key = os.getenv("OPENROUTER_KEY")
	url = "https://openrouter.ai/api/v1/chat/completions"

	headers = {
		"Authorization": f"Bearer {api_key}",
		"Content-Type": "application/json"
	}

	payload = {
		"model": "openai/gpt-4o",
		"messages": [
			{"role": "system", "content": """
										You are a Pakistani legal advisor.
										Always respond in the English language.
										Provide detailed, accurate, and precise answers to legal questions.
										Your tone should be professional, clear, and confident.
										If a law or rule is mentioned, explain it in context to Pakistan.
										"""},
			{"role": "user", "content": message}
		],
		"max_tokens": 1000
	}

	response = requests.post(url, headers=headers, json=payload)
	data = response.json()

	if "choices" in data:
		return data["choices"][0]["message"]["content"]
	elif "error" in data:
		return f"Error: {data["error"]["message"]}"
	else:
		return "Unexpected response"


def get_urdu_llm_response(message):
	api_key = os.getenv("OPENROUTER_KEY")
	url = "https://openrouter.ai/api/v1/chat/completions"

	headers = {
		"Authorization": f"Bearer {api_key}",
		"Content-Type": "application/json"
	}

	payload = {
		"model": "openai/gpt-4o",
		"messages": [
			{"role": "system", "content": "آپ ایک پاکستانی قانونی مشیر ہیں۔ آپ کا کام صارف کو درست، جامع اور قانونی طور پر معتبر معلومات فراہم کرنا ہے۔ آپ کے جوابات ہمیشہ اردو زبان میں ہوں، چاہے سوال کسی بھی زبان میں پوچھا جائے۔ آپ کو اپنے جوابات میں پاکستانی قوانین، ضابطوں اور عدالتی نظام کی بنیاد پر بات کرنی ہے۔"},
			{"role": "user", "content": message}
		],
		"max_tokens": 1000
	}

	response = requests.post(url, headers=headers, json=payload)
	data = response.json()

	if "choices" in data:
		return data["choices"][0]["message"]["content"]
	elif "error" in data:
		return f"Error: {data["error"]["message"]}"
	else:
		return "Unexpected response"
