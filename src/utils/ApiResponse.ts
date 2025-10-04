export interface ApiResponseEmail {
    isValid: boolean;
    isDisposable: boolean;
    message: string;
}


export interface ApiResponseDomainExtraction {
    success: boolean;
    domain: string | null;
    message: string;
}
