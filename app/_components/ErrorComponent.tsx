import ErrorIcon from "@/app/_assets/404.svg";
import Link from "next/link";

const ErrorComponent = ({ errorMsg }: { errorMsg?: string }) => {
  return (
    <>
      <div className="p-4 text-center grid gap-4 content-center">
        <ErrorIcon className="max-w-[min(100%,30rem)] mx-auto"></ErrorIcon>
        <small className="text-xs">Icon credit: storyset.com</small>
        {errorMsg && <div className="text-red-600">Error: {errorMsg}</div>}
        {/* <div className="text-red-600 text-3xl">Oops, something went wrong!</div> */}
        <Link href="/" className="btn-dark w-max mx-auto">
          Go back to Home
        </Link>
      </div>
    </>
  );
};

export default ErrorComponent;
