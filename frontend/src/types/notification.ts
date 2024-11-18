// Define the shape of the context
export interface INotification {
  _id: string;
  recipient: string;
  sender: {
    _id: string;
    username: string;
    personalInfo: { profilePictureUrl: string };
  };
  type: string;
  content: string;
  link?: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}
