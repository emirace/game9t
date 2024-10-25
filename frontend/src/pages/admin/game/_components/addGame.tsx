import React, { useEffect, useState } from "react";
import { useToastNotification } from "../../../../context/toastNotificationContext";
import { useGame } from "../../../../context/game";
import Checkbox from "../../../profile/_components/checkbox";
import { compressImageUpload } from "../../../../utils/image";
import Loading from "../../../_components/loading";
import { imageUrl } from "../../../../services/api";
import { IGame } from "../../../../types/game";
import { IGameData } from "../../../../services/game";

interface Props {
  onClose: () => void;
  gameId?: string;
  initialGameData?: IGame;
}

const GameForm: React.FC<Props> = ({ onClose, gameId, initialGameData }) => {
  const { addNotification } = useToastNotification();
  const { createNewGame, updateExistingGame } = useGame();

  const [gameData, setGameData] = useState<IGameData>({
    name: initialGameData?.name || "",
    description: initialGameData?.description || "",
    genre: (initialGameData?.genre as unknown as string) || "Puzzle",
    platforms: initialGameData?.platforms || [],
    paid: initialGameData?.paid || false,
    onlineMultiplayer: initialGameData?.onlineMultiplayer || true,
    active: initialGameData?.active || true,
    price: (initialGameData?.price as unknown as string) || "0",
    image: initialGameData?.image || "",
    playPreview: initialGameData?.playPreview || [],
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialGameData) {
      setGameData(initialGameData as unknown as IGameData);
    }
  }, [initialGameData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setGameData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setGameData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePlatformChange = (platform: string) => {
    setGameData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageurl = await compressImageUpload(file, 2048);
      setGameData((prev) => ({ ...prev, image: imageurl }));
      addNotification({ message: "Image uploaded successfully" });
    } catch (error) {
      addNotification({ message: "Image upload failed", error: true });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (gameId) {
        // If gameId exists, update the game
        await updateExistingGame(gameId, gameData);
        addNotification({ message: "Game updated successfully!" });
      } else {
        // If no gameId, create a new game
        await createNewGame(gameData);
        addNotification({ message: "Game created successfully!" });
      }
      onClose();
    } catch (error) {
      addNotification({ message: "Failed to save game", error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" space-y-4">
      <h2 className="text-2xl font-semibold">
        {gameId ? "Edit Game" : "Add New Game"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Game Name"
        value={gameData.name}
        onChange={handleInputChange}
        className="w-full p-3 bg-black rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={gameData.description}
        onChange={handleInputChange}
        className="w-full p-3 bg-black rounded"
        required
      />

      <select
        name="genre"
        value={gameData.genre}
        onChange={handleInputChange}
        className="w-full p-3 bg-black rounded"
        required
      >
        <option value="Puzzle">Puzzle</option>
      </select>

      <div className="flex space-x-4">
        {["Web", "Android", "IOS"].map((platform) => (
          <div key={platform} className="flex items-center space-x-2">
            <Checkbox
              checked={gameData.platforms.includes(platform)}
              onChange={() => handlePlatformChange(platform)}
            />
            <span>{platform}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          checked={gameData.paid}
          onChange={() => handleCheckboxChange("paid", !gameData.paid)}
        />
        <span>Paid Game</span>
      </div>

      {gameData.paid && (
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={gameData.price}
          onChange={handleInputChange}
          className="w-full p-3 bg-black rounded"
          required
        />
      )}

      <label className="flex items-center space-x-2">
        <Checkbox
          checked={gameData.onlineMultiplayer}
          onChange={() =>
            handleCheckboxChange(
              "onlineMultiplayer",
              !gameData.onlineMultiplayer
            )
          }
        />
        <span>Online Multiplayer</span>
      </label>

      {gameId && (
        <label className="flex items-center space-x-2">
          <Checkbox
            checked={gameData.active}
            onChange={() => handleCheckboxChange("active", !gameData.active)}
          />
          <span>Active</span>
        </label>
      )}

      <div className="pt-4 flex gap-4 items-center ">
        <label
          htmlFor="image"
          className="border border-cream rounded-md py-2 px-4 text-cream"
        >
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            className="sr-only"
            accept="image/*"
          />
          <span>Upload Image</span>
        </label>
        {uploading && <Loading size="sm" />}
      </div>

      {gameData.image && (
        <img
          src={imageUrl + gameData.image}
          alt="Game Preview"
          className="w-32 py-2"
        />
      )}

      <button
        type="submit"
        className="py-2 px-4 mt-4 bg-cream w-full justify-center text-black rounded flex items-center gap-2"
        disabled={loading}
      >
        {loading && <Loading size="sm" />}
        <span className="font-jua">{gameId ? "Save Changes" : "Add Game"}</span>
      </button>
    </form>
  );
};

export default GameForm;
