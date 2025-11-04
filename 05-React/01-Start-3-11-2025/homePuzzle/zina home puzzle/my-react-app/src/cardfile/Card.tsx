import styles from './Card.module.scss';


const hobbies = [
  'Drawing',
  'Photography',
  'Writing',
  'Hiking',
  'Reading',
  'Gardening',
  'Cooking',
];

const books = [
  'Pride and Prejudice',
  'To Kill a Mockingbird',
];

type PersonCardProps = {
  name: string;
  age: number;
  role: string;
  photo: string;
};

function PersonCard({ name, age, role, photo }: PersonCardProps) {
  return (
    <div className={styles.personCard}>
      <img src={photo} alt={`${name}'s photo`} className={styles.photo} />
      <h2>{name}</h2>
      <p>{age} years old — {role}</p>
    </div>
  );
}

type ItemListProps = {
  title: string;
  items: string[];
};

function ItemList({ title, items }: ItemListProps) {
  return (
    <div className={styles.list}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function Card() {
  return (
    <div className={styles.card}>
      <PersonCard name="Zina" age={35} role="Frontend enthusiast" photo="/src/assets/zina.jpg" />
      <section className={styles.lists}>
        <ItemList title="Hobbies" items={hobbies} />
        <ItemList title="Favorite Books" items={books} />
      </section>
    </div>
  );
}