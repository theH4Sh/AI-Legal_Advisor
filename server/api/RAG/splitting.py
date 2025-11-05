from langchain_text_splitters import NLTKTextSplitter
import nltk

def splitter(chunk_size, text):
    try:
        nltk.data.find("tokenizers/punkt")
    except LookupError:
        nltk.download("punkt")
        nltk.download("punkt_tab")
        
    text_splitter = NLTKTextSplitter(
        chunk_size=chunk_size
    )
    all_splits = text_splitter.split_text(text)
    return all_splits