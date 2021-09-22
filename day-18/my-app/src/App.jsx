import './App.css';

function App() {
  return (
    <div className="container">
      <word-count limit="100">
        <h3>個人自介</h3>
        <textarea className="needcount" rows="10" placeholder="請輸入您的個人描述...">
    </textarea>
      </word-count>
    </div>
  );
}

export default App;
