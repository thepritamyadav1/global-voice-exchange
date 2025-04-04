import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Video, Upload, Check, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

const SubmitFeedback = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { userName } = useAuth();
  
  // Form state
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Product rating state
  const [rating, setRating] = useState<number | null>(null);
  
  // Additional product details
  const [price, setPrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setVideoFile(file);
      
      // Create a video preview URL
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
      
      // Simulate upload progress
      setIsUploading(true);
      simulateUploadProgress();
    }
  };
  
  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !productName || !feedback || !videoFile || !rating) {
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
      setVideoPreview(null);
      setRating(null);
      setPrice("");
      setPurchaseDate("");
      
      // Navigate to dashboard after submission
      navigate("/dashboard");
    }, 2000);
  };
  
  const handleRatingSelect = (value: number) => {
    setRating(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow py-8 bg-muted/30">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Submit Feedback</h1>
            <p className="text-foreground/70">
              {userName ? `Hi ${userName}, share your honest opinion and earn rewards` : 'Share your honest opinion and earn rewards'}
            </p>
          </div>

          <Card className="shadow-sm border-opacity-50">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                <CardTitle>New Product Feedback</CardTitle>
              </div>
              <CardDescription>
                Fill out the form below and record your video feedback to earn rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center gap-1">
                    Product Category <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger id="category" className="w-full">
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
                  <Label htmlFor="productName" className="flex items-center gap-1">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="productName"
                    placeholder="e.g., Samsung Galaxy S23, Sony WH-1000XM4"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Approximate Price</Label>
                    <Input 
                      id="price"
                      placeholder="₹00.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="purchaseDate">Purchase Date</Label>
                    <Input 
                      id="purchaseDate"
                      type="date"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    Product Rating <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Button
                        key={value}
                        type="button"
                        variant={rating === value ? "default" : "outline"}
                        className={`rounded-full w-10 h-10 p-0 ${rating === value ? "bg-primary" : ""}`}
                        onClick={() => handleRatingSelect(value)}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {rating ? `You rated this product ${rating} out of 5` : "Select a rating from 1-5"}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feedback" className="flex items-center gap-1">
                    Written Feedback <span className="text-red-500">*</span>
                  </Label>
                  <Textarea 
                    id="feedback"
                    placeholder="Share your detailed thoughts about the product..."
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="resize-none"
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-1">
                      Video Feedback <span className="text-red-500">*</span>
                    </Label>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Info className="h-3 w-3" /> 1-3 min video
                    </Badge>
                  </div>
                  
                  {!videoFile ? (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center transition-colors hover:bg-muted/50 cursor-pointer" onClick={() => document.getElementById('video')?.click()}>
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
                      <Button variant="outline" className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Select Video File
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Video className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium truncate max-w-[200px] md:max-w-xs">{videoFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setVideoFile(null);
                            setVideoPreview(null);
                          }}
                        >
                          Change Video
                        </Button>
                      </div>
                      
                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Uploading...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="h-2" />
                        </div>
                      )}
                      
                      {videoPreview && !isUploading && (
                        <div className="rounded-md overflow-hidden border bg-black">
                          <video 
                            src={videoPreview} 
                            controls 
                            className="w-full max-h-[200px]"
                          ></video>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="pt-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Info className="h-4 w-4 mr-1" /> 
                      Fields marked with <span className="text-red-500 mx-1">*</span> are required
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full md:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Feedback
                        </>
                      )}
                    </Button>
                  </div>
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
