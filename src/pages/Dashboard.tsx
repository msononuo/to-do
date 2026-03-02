import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useUser from "../components/useUser.js";

type Task = {
  id: string;
  title: string;
};

type FormValues = {
  title: string;
};

function Dashboard() {
  const { user } = useUser();
  const storageKey = user?.id ? `tasks_${user.id}` : null;

  const [tasks, setTasks] = useState<Task[]>(() => {
    if (!storageKey) return [];
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [editingID, setEditingID] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  useEffect(() => {
    if (!storageKey) {
      setTasks([]);
      return;
    }
    try {
      const saved = localStorage.getItem(storageKey);
      setTasks(saved ? JSON.parse(saved) : []);
    } catch {
      setTasks([]);
    }
  }, [storageKey]);

  const onSubmit = (data: FormValues) => {
    const title = data.title.trim();
    if (!title) return;

    if (editingID === null) {
      const newTask: Task = { id: crypto.randomUUID(), title };
      setTasks((prev) => [...prev, newTask]);
    } else {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingID ? { ...t, title } : t)),
      );
      setEditingID(null);
    }

    reset({ title: "" });
  };

  const handlDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingID === id) {
      setEditingID(null);
      reset({ title: "" });
    }
  };

  const handlEdit = (t: Task) => {
    setEditingID(t.id);
    reset({ title: t.title });
  };

  const cancelEdit = () => {
    setEditingID(null);
    reset({ title: "" });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Add, edit, and manage your tasks
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-3">
            <div>
              <input
                placeholder="Title"
                type="text"
                className={`w-full rounded-xl border px-4 py-3 outline-none transition
                  ${
                    errors.title
                      ? "border-red-400 focus:ring-4 focus:ring-red-100"
                      : "border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400"
                  }`}
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                })}
              />

              {errors.title && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition font-medium"
              >
                {editingID ? "Update" : "Add"}
              </button>

              {editingID && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-xl transition font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Tasks ({tasks.length})
          </h2>

          {tasks.length === 0 ? (
            <div className="mt-3 bg-white rounded-2xl shadow-sm p-6 text-slate-500">
              No tasks yet. Add your first task above.
            </div>
          ) : (
            <ul className="mt-3 space-y-3">
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 truncate">
                      {t.title}
                    </p>
                    {editingID === t.id && (
                      <span className="inline-block mt-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                        Editing
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handlEdit(t)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl transition"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handlDelete(t.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
