from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from os import getenv
from dotenv import load_dotenv
from .vectorstore import load_faiss_store

load_dotenv()

def open_router_llm():
    return ChatOpenAI(
        api_key=getenv("OPENROUTER_KEY"),
        base_url="https://openrouter.ai/api/v1",
        model="openai/gpt-oss-120b"
    )


def retrieve(message): 
    llm = open_router_llm()
    vector_store = load_faiss_store()

    retrieved_docs = vector_store.similarity_search(message, k=2)
    context = "\n\n".join([d.page_content for d in retrieved_docs])
    print(context)
    messages = [
        SystemMessage(
            content=(
                    """
						You are a Pakistani legal advisor.
						Always respond in the English language.
						Provide detailed, accurate, and precise answers to legal questions.
						Your tone should be professional, clear, and confident.
                        Make sure to utilize the context below.
						If a law or rule is mentioned, explain it in context to Pakistan.
					"""            
                )
        ),
        HumanMessage(
            content=(f"Related Legal Context: {context} \n\n User Question: {message}")
        )
    ]

    ai_response = llm.invoke(messages)
    # Return only the model's text
    return ai_response.content if hasattr(ai_response, "content") else str(ai_response)