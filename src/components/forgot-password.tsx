import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PopoverForgotPassword() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <p className="underline underline-offset-5 hover:text-ring cursor-pointer">
          Forgot your password?
        </p>
      </PopoverTrigger>
      <PopoverContent className="max-w-sm">
        <h4 className=" font-medium">Ask your admin</h4>
      </PopoverContent>
    </Popover>
  );
}
