import { toast } from "react-hot-toast";

export const notify = (message: string, type: "success" | "error" = "success") => toast[type](message);

