import React from "react";

export const useLoading = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    return { isLoading, setIsLoading };
};
