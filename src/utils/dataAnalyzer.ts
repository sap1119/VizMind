import Papa from 'papaparse';
import { DataRow, ParsedData, ChartConfig } from '../types';

export class DataAnalyzer {
  static parseCSV(file: File): Promise<ParsedData> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          try {
            const headers = results.meta.fields || [];
            const rows = results.data as DataRow[];
            
            const summary = this.generateSummary(headers, rows);
            
            resolve({
              headers,
              rows,
              summary
            });
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  static generateSummary(headers: string[], rows: DataRow[]) {
    const columnTypes: Record<string, 'number' | 'string' | 'date'> = {};
    const sampleValues: Record<string, (string | number)[]> = {};

    headers.forEach(header => {
      const values = rows.slice(0, 10).map(row => row[header]).filter(val => val !== null && val !== undefined);
      sampleValues[header] = values;
      
      // Determine column type
      const numericValues = values.filter(val => typeof val === 'number' || !isNaN(Number(val)));
      if (numericValues.length > values.length * 0.8) {
        columnTypes[header] = 'number';
      } else if (values.some(val => this.isDateString(val))) {
        columnTypes[header] = 'date';
      } else {
        columnTypes[header] = 'string';
      }
    });

    return {
      totalRows: rows.length,
      totalColumns: headers.length,
      columnTypes,
      sampleValues
    };
  }

  static generateChartConfig(parsedData: ParsedData): ChartConfig {
    const { headers, summary } = parsedData;
    const { columnTypes } = summary;

    // Find numeric columns
    const numericColumns = headers.filter(h => columnTypes[h] === 'number');
    const stringColumns = headers.filter(h => columnTypes[h] === 'string');

    if (numericColumns.length >= 2) {
      return {
        type: 'bar',
        xAxis: stringColumns[0] || headers[0],
        yAxis: numericColumns[0],
        title: `${numericColumns[0]} Analysis`
      };
    } else if (numericColumns.length === 1 && stringColumns.length >= 1) {
      return {
        type: 'bar',
        xAxis: stringColumns[0],
        yAxis: numericColumns[0],
        title: `${numericColumns[0]} by ${stringColumns[0]}`
      };
    } else {
      return {
        type: 'bar',
        xAxis: headers[0],
        yAxis: headers[1] || headers[0],
        title: 'Data Overview'
      };
    }
  }

  static answerQuestion(question: string, parsedData: ParsedData): string {
    const { rows, headers, summary } = parsedData;
    const lowerQuestion = question.toLowerCase();

    // Enhanced AI responses with more intelligence
    if (lowerQuestion.includes('insight') || lowerQuestion.includes('pattern')) {
      const numericColumns = headers.filter(h => summary.columnTypes[h] === 'number');
      if (numericColumns.length > 0) {
        const column = numericColumns[0];
        const values = rows.map(row => Number(row[column]) || 0);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const max = Math.max(...values);
        const min = Math.min(...values);
        
        return `Key insights for ${column}: Average is ${avg.toFixed(2)}, with values ranging from ${min} to ${max}. ${max > avg * 2 ? 'There are significant outliers that may need investigation.' : 'The data distribution appears relatively normal.'}`;
      }
    }

    if (lowerQuestion.includes('correlation') || lowerQuestion.includes('relationship')) {
      const numericColumns = headers.filter(h => summary.columnTypes[h] === 'number');
      if (numericColumns.length >= 2) {
        return `To analyze correlations between ${numericColumns.slice(0, 2).join(' and ')}, I'd recommend looking at scatter plots and calculating correlation coefficients. Strong correlations (>0.7 or <-0.7) indicate meaningful relationships.`;
      }
    }

    if (lowerQuestion.includes('recommend') || lowerQuestion.includes('suggest')) {
      const numericCols = headers.filter(h => summary.columnTypes[h] === 'number').length;
      const stringCols = headers.filter(h => summary.columnTypes[h] === 'string').length;
      
      return `Based on your data structure (${numericCols} numeric, ${stringCols} categorical columns), I recommend: 1) Trend analysis for time-based patterns, 2) Segmentation analysis by categories, 3) Statistical summaries for outlier detection, and 4) Correlation analysis between numeric variables.`;
    }

    if (lowerQuestion.includes('total') || lowerQuestion.includes('count') || lowerQuestion.includes('how many')) {
      return `Your dataset contains ${summary.totalRows} records across ${summary.totalColumns} columns. This ${summary.totalRows > 1000 ? 'large' : summary.totalRows > 100 ? 'medium-sized' : 'small'} dataset is ${summary.totalRows > 100 ? 'suitable for robust statistical analysis' : 'good for initial exploration'}.`;
    }

    if (lowerQuestion.includes('columns') || lowerQuestion.includes('fields')) {
      const numericColumns = headers.filter(h => summary.columnTypes[h] === 'number');
      const stringColumns = headers.filter(h => summary.columnTypes[h] === 'string');
      return `Your dataset has ${summary.totalColumns} columns: ${numericColumns.length} numeric (${numericColumns.join(', ')}) and ${stringColumns.length} categorical (${stringColumns.join(', ')}). This mix allows for comprehensive analysis including trends, comparisons, and segmentation.`;
    }

    if (lowerQuestion.includes('sum') || lowerQuestion.includes('total')) {
      const numericColumns = headers.filter(h => summary.columnTypes[h] === 'number');
      if (numericColumns.length > 0) {
        const column = numericColumns[0];
        const sum = rows.reduce((acc, row) => acc + (Number(row[column]) || 0), 0);
        return `Total ${column}: ${sum.toLocaleString()}. This represents the cumulative value across all ${rows.length} records in your dataset.`;
      }
    }

    if (lowerQuestion.includes('average') || lowerQuestion.includes('mean')) {
      const numericColumns = headers.filter(h => summary.columnTypes[h] === 'number');
      if (numericColumns.length > 0) {
        const column = numericColumns[0];
        const values = rows.map(row => Number(row[column]) || 0);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const median = values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
        return `Average ${column}: ${avg.toFixed(2)}. The median is ${median}, which ${Math.abs(avg - median) < avg * 0.1 ? 'suggests a normal distribution' : 'indicates some skewness in the data'}.`;
      }
    }

    if (lowerQuestion.includes('max') || lowerQuestion.includes('highest')) {
      const numericColumns = headers.filter(h => summary.columnTypes[h] === 'number');
      if (numericColumns.length > 0) {
        const column = numericColumns[0];
        const values = rows.map(row => Number(row[column]) || 0);
        const max = Math.max(...values);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        return `Maximum ${column}: ${max.toLocaleString()}. This is ${(max/avg).toFixed(1)}x the average, ${max > avg * 2 ? 'indicating a significant outlier that may warrant investigation' : 'which is within normal range'}.`;
      }
    }

    if (lowerQuestion.includes('min') || lowerQuestion.includes('lowest')) {
      const numericColumns = headers.filter(h => summary.columnTypes[h] === 'number');
      if (numericColumns.length > 0) {
        const column = numericColumns[0];
        const min = Math.min(...rows.map(row => Number(row[column]) || 0));
        return `Minimum ${column}: ${min.toLocaleString()}. ${min === 0 ? 'Note: Zero values detected - verify if these represent missing data or actual zeros.' : 'This represents the lowest recorded value in your dataset.'}`;
      }
    }

    if (lowerQuestion.includes('quality') || lowerQuestion.includes('missing') || lowerQuestion.includes('clean')) {
      const nullCount = rows.reduce((acc, row) => {
        return acc + headers.filter(header => !row[header] || row[header] === '').length;
      }, 0);
      const nullPercentage = (nullCount / (rows.length * headers.length)) * 100;
      
      return `Data quality assessment: ${nullPercentage.toFixed(1)}% missing values detected. ${nullPercentage < 5 ? 'Excellent data quality!' : nullPercentage < 15 ? 'Good quality with minor gaps.' : 'Consider data cleaning - significant missing values may impact analysis.'} Complete records: ${rows.length - Math.floor(nullCount / headers.length)}.`;
    }

    return "I can help you analyze patterns, correlations, data quality, statistical summaries, and provide recommendations for your dataset. Try asking about insights, trends, data quality, or specific metrics!";
  }

  private static isDateString(value: any): boolean {
    if (typeof value !== 'string') return false;
    const date = new Date(value);
    return !isNaN(date.getTime()) && value.match(/\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4}/);
  }
}