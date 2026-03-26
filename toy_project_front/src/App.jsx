import { useState } from "react"; // UseState 사용하려면 import 해와야!!
import Card from "./Components/Card";
import Button from "./Components/Button";
import Input from "./Components/Input";
import TextArea from "./Components/TextArea";

const App = () => {
  // UseState를 사용하여 초깃값 설정
  const [textValue, setTextValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [content, setContent] = useState("");

  // 버튼 클릭 시 실행
  const handleSubmit = () => {
    alert(
`문자: ${textValue}
숫자: ${numberValue}
텍스트: ${content}`);
  };

  return (
    <Card>
      <h2>첫 번째 토이 프로젝트</h2>
      
      {/* 텍스트 Input */}
      <Input 
        type="text" 
        value={textValue} 
        onChange={(e) => setTextValue(e.target.value)}
        placeholder="문자를 입력하세요" 
      />
      <br />

      {/* 숫자 Input */}
      <Input 
        type="number" 
        value={numberValue} 
        onChange={(e) => setNumberValue(e.target.value)} 
        placeholder="숫자를 입력하세요" 
        pattern="[0-9]*" inputmode="numeric" // 모바일 모드에서 숫자 키보드가 뜨도록 설정
      />
      <br />

      {/* TextArea */}
      <TextArea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="텍스트를 입력하세요" 
      />
      <br />

      <Button 
        onClick={handleSubmit} 
        disabled={content.length === 0} // 텍스트가 비어있으면 버튼 비활성화
      >
        버튼
      </Button>
    </Card>
  );
};

export default App;