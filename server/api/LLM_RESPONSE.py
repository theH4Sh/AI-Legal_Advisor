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
			{"role": "system", "content": "You are a Pakistani Legal assistant. In full detail , precisely and legally correct"},
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
