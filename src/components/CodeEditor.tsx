import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Play, Copy, Terminal, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const CodeEditor = () => {
  const [code, setCode] = useState(`let x = 5;
if x > 3 {
    print("x is greater than 3");
} else {
    print("x is 3 or less");
}`);
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput('x is greater than 3\nProgram executed successfully.');
      setIsRunning(false);
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/30">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Let's Code something cool!
          </h1>
          <div className="flex items-center space-x-2">
            <Button variant="glass" size="sm" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button variant="glow" size="sm" onClick={handleRun} disabled={isRunning}>
              <Play className="h-4 w-4" />
              {isRunning ? 'Running...' : 'Run'}
            </Button>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 p-4">
        <Card className="h-full bg-gradient-card border border-border/50">
          <CardContent className="p-0 h-full">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full resize-none border-0 bg-transparent font-mono text-sm leading-relaxed focus:ring-0 focus:outline-none p-4"
              placeholder="Write your PyGRPS code here..."
              style={{ minHeight: '300px' }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Input/Output Section */}
      <div className="p-4 border-t border-border">
        <Tabs defaultValue="input" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="input" className="flex items-center space-x-2">
              <Terminal className="h-4 w-4" />
              <span>Input Section</span>
            </TabsTrigger>
            <TabsTrigger value="output" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Run Output Section</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-2">
            <Card className="bg-gradient-card border border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">
                  📨 Input Section
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full h-24 resize-none border-border bg-input/50 font-mono text-sm"
                  placeholder="Enter input..."
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="output" className="space-y-2">
            <Card className="bg-gradient-card border border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">
                  ⚙️ Run Output Section
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-24 p-3 bg-muted/30 rounded-md border border-border/50 font-mono text-sm text-success">
                  {output || 'Output will appear here...'}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};