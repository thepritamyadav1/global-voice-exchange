
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, CheckCircle, Clock, AlertCircle } from "lucide-react";

type VerificationStatus = "verified" | "pending" | "unverified" | "rejected";

interface VerificationStatusCardProps {
  status: VerificationStatus;
  completedSteps: number;
  totalSteps: number;
  onStartVerification: () => void;
  onContinueVerification: () => void;
}

export const VerificationStatusCard = ({
  status,
  completedSteps,
  totalSteps,
  onStartVerification,
  onContinueVerification
}: VerificationStatusCardProps) => {
  const progress = Math.round((completedSteps / totalSteps) * 100);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Account Verification
        </CardTitle>
        <CardDescription>
          Verify your account to unlock all features and increase your earning potential
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {status === "verified" && (
            <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-md">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium">Verification Complete</p>
                <p className="text-sm text-green-600">Your account is fully verified</p>
              </div>
            </div>
          )}
          
          {status === "pending" && (
            <div className="flex items-center gap-3 p-4 bg-amber-50 text-amber-700 rounded-md">
              <Clock className="h-6 w-6 text-amber-600" />
              <div>
                <p className="font-medium">Verification in Progress</p>
                <p className="text-sm text-amber-600">We're reviewing your information</p>
              </div>
            </div>
          )}
          
          {status === "rejected" && (
            <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-md">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <div>
                <p className="font-medium">Verification Failed</p>
                <p className="text-sm text-red-600">Please review and resubmit your information</p>
              </div>
            </div>
          )}
          
          {status === "unverified" && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 text-blue-700 rounded-md">
              <Shield className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-medium">Get Verified</p>
                <p className="text-sm text-blue-600">Begin the verification process to unlock full features</p>
              </div>
            </div>
          )}
          
          {(status === "unverified" || status === "rejected" || status === "pending") && (
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm">
                <span>Verification Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {completedSteps} of {totalSteps} steps completed
              </p>
            </div>
          )}
        </div>
      </CardContent>
      
      {(status === "unverified" || status === "rejected") && (
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={status === "unverified" ? onStartVerification : onContinueVerification}
          >
            {status === "unverified" ? "Start Verification" : "Continue Verification"}
          </Button>
        </CardFooter>
      )}
      
      {status === "pending" && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onContinueVerification}
          >
            Check Status
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
