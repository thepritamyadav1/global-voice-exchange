
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Video, Upload } from "lucide-react";

const SubmitFeedback = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setVideoFile(files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !productName || !feedback || !videoFile) {
      toast({
        title: "Error",
        description: "Please fill all required fields and upload a video.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Feedback Submitted!",
        description: "Your feedback has been submitted and is under review.",
      });
      // Reset form
      setSelectedCategory("");
      setProductName("");
      setFeedback("");
      setVideoFile(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow py-8 bg-muted/30">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Submit Feedback</h1>
            <p className="text-foreground/70">Share your honest opinion and earn rewards</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>New Product Feedback</CardTitle>
              <CardDescription>
                Fill out the form below and record your video feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Product Category</Label>
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smartphones">Smartphones</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="home-appliances">Home Appliances</SelectItem>
                      <SelectItem value="audio">Audio Equipment</SelectItem>
                      <SelectItem value="wearables">Wearables</SelectItem>
                      <SelectItem value="computers">Computers & Laptops</SelectItem>
                      <SelectItem value="cameras">Cameras</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input 
                    id="productName"
                    placeholder="e.g., Samsung Galaxy S23, Sony WH-1000XM4"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feedback">Written Feedback</Label>
                  <Textarea 
                    id="feedback"
                    placeholder="Share your thoughts about the product..."
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Label>Video Feedback</Label>
                  
                  {!videoFile ? (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Video className="mx-auto h-10 w-10 text-foreground/40 mb-4" />
                      <p className="mb-2 font-medium">Upload your video feedback</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Record a 1-3 minute video review of the product
                      </p>
                      <Input
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="hidden"
                      />
                      <Label htmlFor="video" asChild>
                        <Button variant="outline" className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          Select Video File
                        </Button>
                      </Label>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <Video className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium">{videoFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setVideoFile(null)}
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubmitFeedback;
