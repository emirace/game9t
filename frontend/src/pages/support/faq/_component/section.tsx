import { Question } from "../../../home/_components/faq/_component/question";

function Section() {
  return (
    <div className="mb-6">
      <div className="font-jua text-xl mb-2">General Questions</div>
      <div className="space-y-2">
        <Question title="What is this platform about?" content="" />
        <Question title="What is this platform about?" content="" />
        <Question title="What is this platform about?" content="" />
      </div>
    </div>
  );
}

export default Section;
