import { Question } from "../../../home/_components/faq/_component/question";

function Section({
  faq,
}: {
  faq: { title: string; questions: { question: string; answer: string }[] };
}) {
  return (
    <div className="mb-6">
      <div className="font-jua text-xl mb-2">{faq.title}</div>
      <div className="space-y-2">
        {faq.questions.map((question, index) => (
          <Question
            title={question.question}
            content={question.answer}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Section;
