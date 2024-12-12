import ICONS from "../../../assets/icons/icons";
import { useUser } from "../../../context/user";

interface Props {
  winner?: string;
  amount?: string;
  show?: boolean;
  close: () => void;
}

function GameOver({ amount, winner, show, close }: Props) {
  const { user } = useUser();
  const isWinner = user?._id === winner;

  var title, message, result;

  switch (isWinner) {
    case true:
      title = (
        <div className="flex items-center gap-2">
          <img src={ICONS.trophy3} alt="faq" className="w-auto h-5" />
          Congratulation !
        </div>
      );
      message =
        "You have won the game! Your strategic skills and efforts have paid off.";
      result = "You won";
      break;
    case false:
      title = (
        <div className="flex items-center gap-2">
          <img src={ICONS.cancel} alt="faq" className="w-auto h-5" />
          Game Over !
        </div>
      );
      message =
        "Unfortunately, you lost this round. Keep trying, and you'll achieve victory!";
      result = "You Loss";
      break;
    default:
      title = "";
      message = "";
      result = "";
      break;
  }

  return (
    show && (
      <>
        <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-light_blue text-white rounded-lg p-4 my-2 max-w-md w-full shadow-md flex justify-center z-40 ">
          <div className="space-y-2 flex flex-col items-center px-8">
            <div className="text-2xl text-cream font-jua">
              {winner ? (
                title
              ) : (
                <div className="flex items-center gap-2">
                  <img src={ICONS.draw} alt="faq" className="w-auto h-5" />
                  It's a Draw !
                </div>
              )}
            </div>
            <div className="text-center text-sm">
              {winner
                ? message
                : "Neither side prevailed this time. Try again for a decisive victory!"}
            </div>
            <div className="flex gap-2">
              <div className="font-jua">
                {winner ? result : "No Points Deduction"}
              </div>
              {winner && (
                <div className="flex-1 flex items-center gap-2">
                  :
                  <div className="items-center gap-2 border border-cream rounded-md px-1 flex cursor-pointer">
                    <img
                      src={ICONS.coin_cream}
                      alt="faq"
                      className="w-auto h-4"
                    />
                    <div className="font-jua  text-lg text-cream">{amount}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <img
            src={ICONS.close}
            alt="close"
            className="w-4 h-4 cursor-pointer absolute top-4 right-4"
            onClick={close}
          />
        </div>
        {show && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={close}
          ></div>
        )}
      </>
    )
  );
}

export default GameOver;
