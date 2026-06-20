import { Button } from "@heroui/react";

export default function Home() {
  return (
    <div >
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Welcome to Next.js 14!
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        This is a simple starter template to get you up and running with Next.js 14.
      </p>
      {/* check hero ui */}
      <Button className="mt-4">like</Button>
    </div>
  );
}
