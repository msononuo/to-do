import { useState } from "react";
import { useForm } from "react-hook-form";

type Task = {
  id : string ,
  title : string
}
type FormValues = {
  title : string
}

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingID, setEditingID] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = (data : FormValues) => {
    const title = data.title.trim();
    if (!title) return;

    if (editingID === null) {
      const newTask : Task = { id: crypto.randomUUID(), title };
      setTasks( [...tasks, newTask]);
    } else {
      setTasks((tasks) =>
        tasks.map((t) => (t.id === editingID ? { ...t, title } : t)),
      );
      setEditingID(null);
    }

    reset({ title: "" });
  };

  const handlDelete = (id : string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingID === id) {
      setEditingID(null);
      reset({ title: "" });
    }
  };

  const handlEdit = (t : Task) => {
    setEditingID(t.id);
    reset({ title: t.title });
  };

  const cancelEdit = () => {
    setEditingID(null);
    reset({ title: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Title"
          type="text"
          {...register("title", {
            required: "Title is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
          })}
        />

        {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}

        <button type="submit">{editingID ? "Update" : "Add"}</button>

        {editingID && (
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title}
            <br />
            <button type="button" onClick={() => handlDelete(t.id)}>
              Delete
            </button>
            <button type="button" onClick={() => handlEdit(t)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Dashboard;
