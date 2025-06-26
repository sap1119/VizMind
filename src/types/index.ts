export interface DataRow {
  [key: string]: string | number;
}

export interface ParsedData {
  headers: string[];
  rows: DataRow[];
  summary: DataSummary;
}

export interface DataSummary {
  totalRows: number;
  totalColumns: number;
  columnTypes: Record<string, 'number' | 'string' | 'date'>;
  sampleValues: Record<string, (string | number)[]>;
}

export interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'area';
  xAxis?: string;
  yAxis?: string;
  title: string;
}

export interface AIResponse {
  question: string;
  answer: string;
  relatedData?: any;
}