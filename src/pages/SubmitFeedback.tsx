
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Video, Upload, Check, Info, ArrowRight, Star, Search, Image, Camera, Film } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingDashboard } from "@/components/dashboards/LoadingDashboard";

const SubmitFeedback = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { userName } = useAuth();
  
  // Step navigation state
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("category");
  
  // Form state
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [feedback, setFeedback] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Parameter ratings
  const [ratings, setRatings] = useState({
    performance: 0,
    battery: 0,
    design: 0,
    value: 0,
    support: 0
  });

  // Category and brand data
  const categories = [
    { id: "ai-saas", name: "AI SaaS", icon: <Search className="h-10 w-10 text-primary" /> },
    { id: "smartphones", name: "Mobile Phones", icon: <Image className="h-10 w-10 text-primary" /> },
    { id: "cars", name: "Cars", icon: <Video className="h-10 w-10 text-primary" /> },
    { id: "laptops", name: "Laptops", icon: <Film className="h-10 w-10 text-primary" /> },
    { id: "smart-home", name: "Smart Home Devices", icon: <Camera className="h-10 w-10 text-primary" /> },
    { id: "wearables", name: "Wearables", icon: <Video className="h-10 w-10 text-primary" /> },
  ];
  
  // Dynamic brand options based on selected category
  const getBrands = (category: string) => {
    switch (category) {
      case "smartphones":
        return ["Apple", "Samsung", "Google", "Xiaomi", "OnePlus"];
      case "laptops":
        return ["Apple", "Dell", "HP", "Lenovo", "Asus"];
      case "ai-saas":
        return ["OpenAI", "Anthropic", "Google", "Microsoft", "Meta"];
      case "cars":
        return ["Tesla", "Toyota", "Honda", "Ford", "BMW"];
      case "smart-home":
        return ["Google", "Amazon", "Apple", "Samsung", "Philips"];
      case "wearables":
        return ["Apple", "Samsung", "Fitbit", "Garmin", "Xiaomi"];
      default:
        return [];
    }
  };
  
  // Dynamic product options based on selected brand and category
  const getProducts = (category: string, brand: string) => {
    if (!category || !brand) return [];
    
    if (category === "smartphones") {
      if (brand === "Apple") return ["iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro", "iPhone 14", "iPhone SE"];
      if (brand === "Samsung") return ["Galaxy S23 Ultra", "Galaxy S23", "Galaxy Z Fold 5", "Galaxy Z Flip 5"];
      if (brand === "Google") return ["Pixel 8 Pro", "Pixel 8", "Pixel 7a", "Pixel Fold"];
    } else if (category === "laptops") {
      if (brand === "Apple") return ["MacBook Pro 16\"", "MacBook Pro 14\"", "MacBook Air M2", "MacBook Air M1"];
      if (brand === "Dell") return ["XPS 13", "XPS 15", "XPS 17", "Inspiron 15"];
    }
    
    // Return some generic products if specific mapping not available
    return ["Premium Model", "Standard Model", "Entry Model", "Latest Release"];
  };

  // Questions based on the category
  const getQuestions = (category: string) => {
    switch (category) {
      case "smartphones":
        return [
          "What do you like most about this phone?",
          "How would you rate the camera quality?",
          "How is the battery life?",
          "Would you recommend this phone to others?",
          "What improvements would you suggest?"
        ];
      case "laptops":
        return [
          "How is the performance for your daily tasks?",
          "What do you think about the keyboard and trackpad?",
          "How long does the battery typically last?",
          "Is the display quality meeting your expectations?",
          "What software issues, if any, have you experienced?"
        ];
      default:
        return [
          "What are the standout features of this product?",
          "What could be improved?",
          "How long have you been using this product?",
          "Would you purchase from this brand again?",
          "How would you rate the overall value for money?"
        ];
    }
  };
  
  // Initialize form answers
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // Get current questions based on selected category
  const questions = getQuestions(selectedCategory);

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

  const handleRatingChange = (parameter: keyof typeof ratings, value: number) => {
    setRatings(prev => ({
      ...prev,
      [parameter]: value
    }));
  };

  const handleQuestionAnswer = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [`question_${questionIndex}`]: answer
    }));
  };

  const handleNextStep = () => {
    // Validation for each step
    if (currentStep === 1 && !selectedCategory) {
      toast({
        title: "Category Required",
        description: "Please select a product category to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 2 && !selectedBrand) {
      toast({
        title: "Brand Required",
        description: "Please select a brand to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 3 && !selectedProduct) {
      toast({
        title: "Product Required",
        description: "Please select a product to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 4) {
      // Check if at least 3 questions are answered
      const answeredCount = Object.keys(answers).length;
      if (answeredCount < 3) {
        toast({
          title: "More Answers Needed",
          description: "Please answer at least 3 questions to continue.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (currentStep === 5) {
      // Check if at least 3 parameters are rated
      const ratedCount = Object.values(ratings).filter(rating => rating > 0).length;
      if (ratedCount < 3) {
        toast({
          title: "More Ratings Needed",
          description: "Please rate at least 3 parameters to continue.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (currentStep === 6 && !videoFile) {
      toast({
        title: "Video Required",
        description: "Please upload or record a video to continue.",
        variant: "destructive",
      });
      return;
    }
    
    // Move to next step
    setCurrentStep(prev => prev + 1);
    
    // Set appropriate tab
    if (currentStep === 1) setActiveTab("brand");
    if (currentStep === 2) setActiveTab("product");
    if (currentStep === 3) setActiveTab("questions");
    if (currentStep === 4) setActiveTab("ratings");
    if (currentStep === 5) setActiveTab("video");
    if (currentStep === 6) setActiveTab("review");
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      
      // Set appropriate tab
      if (currentStep === 7) setActiveTab("video");
      if (currentStep === 6) setActiveTab("ratings");
      if (currentStep === 5) setActiveTab("questions");
      if (currentStep === 4) setActiveTab("product");
      if (currentStep === 3) setActiveTab("brand");
      if (currentStep === 2) setActiveTab("category");
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Feedback Submitted!",
        description: "Your feedback has been submitted and is under review.",
      });
      
      // Navigate to thank you step
      setCurrentStep(8);
    }, 2000);
  };
  
  const handleSubmitAnotherFeedback = () => {
    // Reset form
    setCurrentStep(1);
    setActiveTab("category");
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedProduct("");
    setFeedback("");
    setVideoFile(null);
    setVideoPreview(null);
    setRatings({
      performance: 0,
      battery: 0,
      design: 0,
      value: 0,
      support: 0
    });
    setAnswers({});
  };
  
  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  // Show loading state initially
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Short timeout for demo purposes
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <LoadingDashboard />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow py-8 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Header with progress bar */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Submit Product Feedback
            </h1>
            <p className="text-foreground/70 mb-4">
              {userName ? `Hi ${userName}, share your honest opinion and earn rewards` : 'Share your honest opinion and earn rewards'}
            </p>
            
            {currentStep < 8 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Step {currentStep} of 7</span>
                  <span>{Math.round((currentStep / 7) * 100)}% Complete</span>
                </div>
                <Progress value={(currentStep / 7) * 100} className="h-2" />
              </div>
            )}
          </div>

          {/* Main content area */}
          <Card className="shadow-md border-opacity-50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/5 relative">
              <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-accent/10 to-transparent"></div>
              <div className="relative z-10">
                <CardTitle className="text-2xl">
                  {currentStep === 1 && "Choose a Category"}
                  {currentStep === 2 && "Select a Brand"}
                  {currentStep === 3 && "Select a Product"}
                  {currentStep === 4 && "Answer Questions"}
                  {currentStep === 5 && "Rate Parameters"}
                  {currentStep === 6 && "Upload Video Feedback"}
                  {currentStep === 7 && "Review & Submit"}
                  {currentStep === 8 && "Thank You!"}
                </CardTitle>
                <CardDescription className="text-base">
                  {currentStep === 1 && "What type of product would you like to review?"}
                  {currentStep === 2 && "Which brand does your product belong to?"}
                  {currentStep === 3 && "Select the specific product you're reviewing"}
                  {currentStep === 4 && "Tell us about your experience with this product"}
                  {currentStep === 5 && "Rate the product on these key parameters"}
                  {currentStep === 6 && "Record or upload a short video of your feedback"}
                  {currentStep === 7 && "Review your feedback before submitting"}
                  {currentStep === 8 && "Your feedback has been successfully submitted!"}
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <Tabs value={activeTab} className="w-full">
                {/* Step 1: Choose Category */}
                <TabsContent value="category" className="animate-fade-in space-y-4 mt-0">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                      <div 
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedCategory === category.id 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        <div className={`p-4 rounded-full mb-2 ${
                          selectedCategory === category.id ? "bg-primary/10" : "bg-muted"
                        }`}>
                          {category.icon}
                        </div>
                        <span className="font-medium text-center">{category.name}</span>
                        {selectedCategory === category.id && (
                          <Check className="h-5 w-5 text-primary mt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Step 2: Select Brand */}
                <TabsContent value="brand" className="animate-fade-in space-y-4 mt-0">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {getBrands(selectedCategory).map((brand) => (
                      <div 
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedBrand === brand 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        <span className="font-medium text-lg">{brand}</span>
                        {selectedBrand === brand && (
                          <Check className="h-5 w-5 text-primary mt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Step 3: Select Product */}
                <TabsContent value="product" className="animate-fade-in space-y-4 mt-0">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-10" 
                        placeholder="Search for a product..." 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {getProducts(selectedCategory, selectedBrand).map((product) => (
                        <div 
                          key={product}
                          onClick={() => setSelectedProduct(product)}
                          className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                            selectedProduct === product 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-primary/50 hover:bg-muted/50"
                          }`}
                        >
                          <div className="bg-muted w-12 h-12 rounded-md flex items-center justify-center mr-4">
                            <Image className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-grow">
                            <div className="font-medium">{product}</div>
                            <div className="text-sm text-muted-foreground">{selectedBrand}</div>
                          </div>
                          {selectedProduct === product && (
                            <Check className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Step 4: Answer Questions */}
                <TabsContent value="questions" className="animate-fade-in space-y-6 mt-0">
                  <div className="space-y-6">
                    {questions.map((question, index) => (
                      <div 
                        key={index} 
                        className="p-4 rounded-xl border bg-card"
                      >
                        <Label className="font-medium mb-2 block">{question}</Label>
                        <Textarea 
                          placeholder="Type your answer here..." 
                          className="mt-2"
                          value={answers[`question_${index}`] || ""}
                          onChange={(e) => handleQuestionAnswer(index, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Step 5: Rate Parameters */}
                <TabsContent value="ratings" className="animate-fade-in space-y-6 mt-0">
                  <div className="space-y-6">
                    {/* Performance Rating */}
                    <div className="p-4 rounded-xl border bg-card">
                      <div className="flex justify-between items-center mb-3">
                        <Label className="font-medium">Performance</Label>
                        <span className="text-sm text-muted-foreground">
                          {ratings.performance > 0 ? `${ratings.performance}/5` : "Not rated"}
                        </span>
                      </div>
                      <div className="flex gap-3 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            type="button"
                            variant={ratings.performance >= star ? "default" : "outline"}
                            className={`rounded-full w-10 h-10 p-0 ${ratings.performance >= star ? "bg-primary" : ""}`}
                            onClick={() => handleRatingChange("performance", star)}
                          >
                            {star}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Battery Life / Efficiency Rating */}
                    <div className="p-4 rounded-xl border bg-card">
                      <div className="flex justify-between items-center mb-3">
                        <Label className="font-medium">
                          {selectedCategory === "smartphones" || selectedCategory === "laptops" 
                            ? "Battery Life" 
                            : "Efficiency"}
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          {ratings.battery > 0 ? `${ratings.battery}/5` : "Not rated"}
                        </span>
                      </div>
                      <div className="flex gap-3 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            type="button"
                            variant={ratings.battery >= star ? "default" : "outline"}
                            className={`rounded-full w-10 h-10 p-0 ${ratings.battery >= star ? "bg-primary" : ""}`}
                            onClick={() => handleRatingChange("battery", star)}
                          >
                            {star}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Design & Build Quality */}
                    <div className="p-4 rounded-xl border bg-card">
                      <div className="flex justify-between items-center mb-3">
                        <Label className="font-medium">Design & Build Quality</Label>
                        <span className="text-sm text-muted-foreground">
                          {ratings.design > 0 ? `${ratings.design}/5` : "Not rated"}
                        </span>
                      </div>
                      <div className="flex gap-3 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            type="button"
                            variant={ratings.design >= star ? "default" : "outline"}
                            className={`rounded-full w-10 h-10 p-0 ${ratings.design >= star ? "bg-primary" : ""}`}
                            onClick={() => handleRatingChange("design", star)}
                          >
                            {star}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Value for Money */}
                    <div className="p-4 rounded-xl border bg-card">
                      <div className="flex justify-between items-center mb-3">
                        <Label className="font-medium">Value for Money</Label>
                        <span className="text-sm text-muted-foreground">
                          {ratings.value > 0 ? `${ratings.value}/5` : "Not rated"}
                        </span>
                      </div>
                      <div className="flex gap-3 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            type="button"
                            variant={ratings.value >= star ? "default" : "outline"}
                            className={`rounded-full w-10 h-10 p-0 ${ratings.value >= star ? "bg-primary" : ""}`}
                            onClick={() => handleRatingChange("value", star)}
                          >
                            {star}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Customer Support */}
                    <div className="p-4 rounded-xl border bg-card">
                      <div className="flex justify-between items-center mb-3">
                        <Label className="font-medium">Customer Support</Label>
                        <span className="text-sm text-muted-foreground">
                          {ratings.support > 0 ? `${ratings.support}/5` : "Not rated"}
                        </span>
                      </div>
                      <div className="flex gap-3 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            type="button"
                            variant={ratings.support >= star ? "default" : "outline"}
                            className={`rounded-full w-10 h-10 p-0 ${ratings.support >= star ? "bg-primary" : ""}`}
                            onClick={() => handleRatingChange("support", star)}
                          >
                            {star}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Step 6: Video Upload */}
                <TabsContent value="video" className="animate-fade-in space-y-4 mt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-1 font-medium">
                        Video Feedback
                      </Label>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Info className="h-3 w-3" /> 1-3 min video
                      </Badge>
                    </div>
                    
                    {!videoFile ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div 
                          className="border-2 border-dashed rounded-lg p-6 text-center transition-colors hover:bg-muted/50 cursor-pointer h-60 flex flex-col items-center justify-center"
                          onClick={() => document.getElementById('video')?.click()}
                        >
                          <Upload className="mx-auto h-10 w-10 text-foreground/40 mb-4" />
                          <p className="mb-2 font-medium">Upload video</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Upload a pre-recorded video review
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
                        
                        <div className="border-2 border-dashed rounded-lg p-6 text-center transition-colors hover:bg-muted/50 cursor-pointer h-60 flex flex-col items-center justify-center">
                          <Camera className="mx-auto h-10 w-10 text-foreground/40 mb-4" />
                          <p className="mb-2 font-medium">Record now</p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Record a new video using your camera
                          </p>
                          <Button variant="default" className="cursor-pointer">
                            <Video className="mr-2 h-4 w-4" />
                            Start Recording
                          </Button>
                        </div>
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
                              className="w-full max-h-[240px]"
                            ></video>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                {/* Step 7: Review & Submit */}
                <TabsContent value="review" className="animate-fade-in space-y-6 mt-0">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Product Information */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Product Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Category:</span>
                            <span className="font-medium">
                              {categories.find(c => c.id === selectedCategory)?.name || selectedCategory}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Brand:</span>
                            <span className="font-medium">{selectedBrand}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Product:</span>
                            <span className="font-medium">{selectedProduct}</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Ratings Summary */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Ratings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {Object.entries(ratings).map(([key, value]) => (
                            value > 0 && (
                              <div key={key} className="flex justify-between">
                                <span className="text-muted-foreground capitalize">
                                  {key === "battery" && (selectedCategory === "smartphones" || selectedCategory === "laptops") 
                                    ? "Battery Life" 
                                    : key === "battery"
                                    ? "Efficiency"
                                    : key}:
                                </span>
                                <span className="font-medium">{value}/5</span>
                              </div>
                            )
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Video Preview */}
                    {videoFile && videoPreview && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Video Feedback</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="rounded-md overflow-hidden border bg-black">
                            <video 
                              src={videoPreview} 
                              controls 
                              className="w-full max-h-[200px]"
                            ></video>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* Feedback Answers */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Your Feedback</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {Object.entries(answers).map(([key, value]) => {
                          const questionIndex = parseInt(key.split('_')[1]);
                          return (
                            <div key={key} className="space-y-1">
                              <h4 className="text-sm font-medium">{questions[questionIndex]}</h4>
                              <p className="text-sm text-muted-foreground">{value}</p>
                            </div>
                          );
                        })}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Step 8: Thank You */}
                <TabsContent value="thankyou" className="animate-fade-in space-y-6 mt-0">
                  <div className="text-center py-8">
                    <div className="bg-primary/10 p-4 rounded-full inline-flex mb-4">
                      <Check className="h-12 w-12 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Thank You for Your Feedback!</h2>
                    <p className="text-muted-foreground mb-6">
                      Your feedback has been successfully submitted and is now under review.
                      You'll receive reward points once your feedback is approved.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button onClick={handleSubmitAnotherFeedback}>
                        Submit Another Feedback
                      </Button>
                      <Button variant="outline" onClick={handleNavigateToDashboard}>
                        Return to Dashboard
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="p-6 flex flex-col sm:flex-row sm:justify-between gap-4 bg-muted/30">
              {currentStep < 8 ? (
                <>
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      className="w-full sm:w-auto"
                    >
                      Back
                    </Button>
                  )}
                  
                  {currentStep < 7 ? (
                    <Button 
                      onClick={handleNextStep}
                      className="w-full sm:w-auto sm:ml-auto"
                    >
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto sm:ml-auto"
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
                  )}
                </>
              ) : (
                <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleSubmitAnotherFeedback}>
                    Submit Another Feedback
                  </Button>
                  <Button variant="outline" onClick={handleNavigateToDashboard}>
                    Return to Dashboard
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubmitFeedback;
