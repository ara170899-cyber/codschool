export interface MathTask {
  id: string;
  description: string;
  answer: string;
  tolerance?: number;
  solution: string;
  difficulty: 1 | 2 | 3;
}

export interface MathTopic {
  taskNumber: number;
  title: string;
  theory: string;
  tasks: MathTask[];
}
