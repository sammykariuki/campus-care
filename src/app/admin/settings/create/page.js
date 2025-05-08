"use client";

import { useActionState } from "react";
import { signUpAdmin } from "@/lib/auth_actions/actions";
import classes from "./page.module.css";

export default function CreateAdmin() {
  const [state, formAction, pending] = useActionState(signUpAdmin, {
    message: null,
    email: "",
  });

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h1 className={classes.title}>Add New Admin</h1>
        <form action={formAction} className={classes.form}>
          <label className={classes.field}>
            Email
            <input
              name="email"
              type="email"
              defaultValue={state.email}
              placeholder="admin@example.com"
              required
            />
          </label>
          <label className={classes.field}>
            Password
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              minLength={8}
              required
            />
          </label>
          {state.message && <p className={classes.error}>{state.message}</p>}
          <div className={classes.actions}>
            <button type="submit" disabled={pending}>
              {pending ? "Adding…" : "Add Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}