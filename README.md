## Resume AI - Interactive Resume

This is an interactive chatbot that answers questions about my resume.

## Demo

The chatbot is available at the following address:  
[https://resume-ai-qosi.onrender.com](https://resume-ai-qosi.onrender.com)  
**NOTE:** The server on Render may go to sleep after some time of inactivity. If the application does not load immediately, please wait a few seconds (30-60) for it to restart.

## Technologies Used
- Python (Flask)
- LlamaIndex
- OpenAI API
- JavaScript (Frontend)
- Bootstrap
- Render (Deployment)

## Running the Project Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/domagojziros/Resume_AI.git
   cd Resume_AI
   ```

2. Create a virtual environment and install dependencies:
   ```sh
   python -m venv venv
   source venv/bin/activate  # For macOS/Linux
   venv\Scripts\activate     # For Windows
   pip install -r requirements.txt
   ```

3. Create a `.env` file and add your OpenAI API key:
   ```sh
   OPENAI_API_KEY=your-api-key
   ```

4. Run the application:
   ```sh
   python app.py
   ```

The application will be available at `http://127.0.0.1:5000/`. 
