import os
import faiss
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain_community.vectorstores import FAISS
from .embedding import get_embedding_model

PERSIST_DIR = "./vector_storage/"

def faiss_store():
    embeddings = get_embedding_model()

    embedding_dim = len(embeddings.embed_query("hello world"))
    index = faiss.IndexFlatL2(embedding_dim)

    vector_store = FAISS(
        embedding_function=embeddings,
        index=index,
        docstore=InMemoryDocstore(),
        index_to_docstore_id={},
    )
    

    # print("dim: ", embedding_dim)
    print("✅ FAISS Vector Store initialized.")
    return vector_store

def load_faiss_store():
    """Load an existing FAISS store from disk."""
    embeddings = get_embedding_model()
    if os.path.exists(PERSIST_DIR) and os.listdir(PERSIST_DIR):
        print("📂 Loading existing FAISS store...")
        return FAISS.load_local(
            PERSIST_DIR, 
            embeddings, 
            allow_dangerous_deserialization=True
        )
    else:
        print("❌ No FAISS index found. Creating New...")
        return faiss_store()

def save_faiss_store(store):
    """Save FAISS store to disk."""
    os.makedirs(PERSIST_DIR, exist_ok=True)
    store.save_local(PERSIST_DIR)