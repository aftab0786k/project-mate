import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Card ,CardContent } from "../components/Card";

const Index: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-background to-secondary/30">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Simple project management, beautifully done
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-prose">
              Plan, track, and deliver your work with ease. Create projects, add tasks, set due dates, and stay on top of progress.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="px-6">
                <Link to="/signup">Get started free</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
          <div>
            <Card className="shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Website Redesign</h3>
                  <span className="rounded-full bg-primary/10 text-primary px-2 py-1 text-xs">active</span>
                </div>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <p className="font-medium">Create wireframes</p>
                      <p className="text-xs text-muted-foreground">Due: 2025-10-31</p>
                    </div>
                    <span className="rounded-full bg-amber-100 text-amber-700 px-2 py-1 text-xs">in-progress</span>
                  </li>
                  <li className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <p className="font-medium">Implement components</p>
                      <p className="text-xs text-muted-foreground">Due: 2025-11-05</p>
                    </div>
                    <span className="rounded-full bg-gray-100 text-gray-700 px-2 py-1 text-xs">todo</span>
                  </li>
                  <li className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <p className="font-medium">QA & Launch</p>
                      <p className="text-xs text-muted-foreground">Due: 2025-11-20</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-1 text-xs">done</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;