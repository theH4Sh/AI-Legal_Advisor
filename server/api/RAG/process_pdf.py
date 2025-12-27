from langchain_community.document_loaders import PyPDFLoader
from .splitting import splitter
from .vectorstore import load_faiss_store, save_faiss_store
from tqdm import tqdm

def process_new_pdf(file_path):
    print(f"Processing: {file_path}")
    loader = PyPDFLoader(file_path)

    doc = loader.load()

    # Combine all pages into a single text
    full_text = " ".join([d.page_content for d in doc])

    #Splitting
    print("----------------Splitting------------------")
    all_splits=splitter(1000, full_text)

    print("total splits: ", len(all_splits))

    print("------------------Vector Storage---------------")
    vector_store = load_faiss_store()

    print("Adding text chunks to FAISS store...")
    for i in tqdm(range(0, len(all_splits), 10), desc="🔹 Processing chunks"):
        batch = all_splits[i:i+10] #processes in batches of 10
        vector_store.add_texts(batch)

    print("✅ All chunks added to FAISS store.")

    save_faiss_store(vector_store)
    print("💾 Vector store saved successfully.")