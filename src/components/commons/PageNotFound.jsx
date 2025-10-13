import { NoData } from "neetoui";

const PageNotFound = () => (
  <div className="flex h-screen items-center justify-center ">
    <NoData
      title="The page you're looking for can't be found"
      primaryButtonProps={{
        label: "Back to home",
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: "/",
      }}
    />
  </div>
);

export default PageNotFound;
