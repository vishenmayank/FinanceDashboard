import { Card, CardContent } from "./ui/card";

type Props = {
  title: string;
  amount: number;
};

export default function SummaryCard({ title, amount }: Props) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="text-2xl font-bold mt-2">₹ {amount}</h2>
      </CardContent>
    </Card>
  );
}