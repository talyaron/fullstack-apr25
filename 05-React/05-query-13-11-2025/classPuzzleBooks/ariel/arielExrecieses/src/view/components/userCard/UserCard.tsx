// import styles from "./UserCard.module.scss";

interface Profile {
  name: string;
  age: number;
  city: string;
  isOnline?: boolean;
}

const UserCard = ({ name, age, city, isOnline }: Profile) => {
  return (
    <div className="profile-card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
      <p>Status: {isOnline ? "🟢 Online" : "⚫ Offline"}</p>
    </div>
  );
};

export default UserCard;