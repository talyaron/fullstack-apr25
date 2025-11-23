import React, { useState } from "react";
import styles from "./SortingLists.module.scss";

interface Student {
  id: number;
  name: string;
  grade: number;
}

const StudentList: React.FC = () => {
  const [students] = useState<Student[]>([
    { id: 1, name: "David", grade: 85 },
    { id: 2, name: "Sarah", grade: 92 },
    { id: 3, name: "Michael", grade: 78 },
  ]);
  const [sortBy, setSortBy] = useState<"name" | "grade">("name");

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return b.grade - a.grade;
    }
  });

  return (
    <div className={styles["student-list"]}>
      <div className={styles["student-list__controls"]}>
        <button onClick={() => setSortBy("name")}>Sort by Name</button>
        <button onClick={() => setSortBy("grade")}>Sort by Grade</button>
      </div>

      <ul className={styles["student-list__items"]}>
        {sortedStudents.map((student) => (
          <li key={student.id} className={styles["student-list__item"]}>
            <span>{student.name}</span>
            <span>Grade: {student.grade}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;