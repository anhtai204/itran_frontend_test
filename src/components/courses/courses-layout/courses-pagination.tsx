import { Button } from "@/components/ui/button";

const CoursesPagination = () => {
  return (
    <div className="mt-12 flex justify-center">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="w-10 h-10 p-0 rounded-full"
          disabled
        >
          &lt;
        </Button>
        <Button
          variant="default"
          className="w-10 h-10 p-0 rounded-full bg-purple-600 hover:bg-purple-700"
        >
          1
        </Button>
        <Button variant="outline" className="w-10 h-10 p-0 rounded-full">
          2
        </Button>
        <Button variant="outline" className="w-10 h-10 p-0 rounded-full">
          3
        </Button>
        <Button variant="outline" className="w-10 h-10 p-0 rounded-full">
          &gt;
        </Button>
      </div>
    </div>
  );
};
export default CoursesPagination;
