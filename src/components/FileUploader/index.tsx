import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/Card';
import { useState, ChangeEvent, SyntheticEvent, FC } from 'react';
import { saveAs } from 'file-saver';

const FileUploader: FC = () => {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckedChange = () => setChecked((prevChecked) => !prevChecked);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files ? e.target.files[0] : null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!checked) {
      handleFileSubmit();
    } else {
      handleTextSubmit();
    }
  };

  const handleFileSubmit = () => {
    setError(null);
    if (!file) {
      setError('No file selected.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result?.toString();
      if (!content) return;
      reader.abort();
      processContent(content);
    };
    reader.onerror = () => setError('Failed to read the file.');
    reader.readAsText(file);
  };

  const handleTextSubmit = () => {
    setError(null);
    if (text.trim() === '') {
      setError('Text field is empty.');
      return;
    }
    processContent(text);
  };

  const processContent = (content: string) => {
    setError(null);
    const lines = content.split('\n');
    let scores: Array<any> = [];
    let winner: string = '';

    if (lines.length < 2 || parseInt(lines[0]) > 10000) {
      setError('Content format is invalid.');
    } else {
      scores = formatScore(lines);
      if (scores.length !== parseInt(lines[0])) {
        setError(
          `The number of rounds is incorrect: expected: ${lines[0]} received: ${scores.length}`
        );
        return;
      } else {
        winner = getWinner(scores);
        const blob = new Blob([winner], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'output.txt');
      }
    }
  };

  const getWinner = (scores: Array<any>): string => {
    let maxScore = 0;
    let winner = '';
    scores.forEach((round) => {
      const difference = calculateDifference(round[0], round[1]);
      if (difference > maxScore) {
        winner = round[0] > round[1] ? '1' : '2';
      }
      maxScore = difference > maxScore ? difference : maxScore;
    });

    return `${winner} ${maxScore}`;
  };

  const calculateDifference = (a: number, b: number) => {
    return Math.abs(a - b);
  };

  const formatScore = (lines: Array<any>): Array<any> => {
    let scores = [];
    for (let i = 1; i < lines.length; i++) {
      scores.push(lines[i].split(' ').map((item: any) => parseInt(item, 10)));
    }
    return scores;
  };

  function reset(e: SyntheticEvent) {
    e.preventDefault();
    setText('');
    setFile(null);
    setChecked(false);
    setError(null);
  }

  return (
    <>
      <div className="flex justify-center mt-10">
        <Card className="w-[450px]">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form onSubmit={handleFormSubmit}>
            <CardHeader>
              <CardTitle>Game Score Uploader</CardTitle>
              <CardDescription>
                You can either upload a file or enter the details manually in
                the text area below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end items-center space-x-2 mb-5">
                <Switch
                  id="upload-mode"
                  checked={checked}
                  onCheckedChange={handleCheckedChange}
                />
                <Label htmlFor="upload-mode">Enter manually</Label>
              </div>
              {checked ? (
                <Textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Type your message here."
                  id="message"
                />
              ) : (
                <Input id="file" type="file" onChange={handleFileChange} />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant={'ghost'} onClick={reset}>
                Reset
              </Button>
              <Button type="submit">Decrypt</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default FileUploader;
