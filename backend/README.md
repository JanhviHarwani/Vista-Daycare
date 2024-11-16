# Setup aws:
- pip install awscli
- aws configure - Add aws api key and secret to set up aws account

# To run:
- cd backend
- if venv: source ./venv/bin/activate
- pip install -r requirements.txt
- python app.py - To run the flask app

# To update the Pinecone vector store:
- Add the questions and answers you want to customise in rag/questions.json
- python rag_main.py - To update the VectorDB Pinecone
