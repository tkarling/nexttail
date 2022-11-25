import { FormEvent } from "react";
import { Input, Button } from "./Common";

export default function LoginForm({
  errorMessage,
  onSubmit,
}: {
  errorMessage: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        <div className="pb-2">Type your GitHub username:</div>
        <Input type="text" name="username" required />
      </label>
      <div className="pt-2">
        <Button type="submit">Login</Button>
      </div>

      {errorMessage && <p className="pt-4 text-red-500">{errorMessage}</p>}
    </form>
  );
}
