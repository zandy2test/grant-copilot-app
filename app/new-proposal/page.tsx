"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useCompletion } from "ai/react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Sparkles, Lightbulb, AlertTriangle } from "lucide-react"

// This custom fetcher is designed to extract detailed error messages from our API route.
const customFetcher = async (url: string, init?: RequestInit) => {
  const response = await fetch(url, init)

  if (!response.ok) {
    // If the response is not OK, we expect a JSON error from our API route
    const errorText = await response.text()
    const errorPayload = {
      message: `Error: ${response.status} ${response.statusText}`,
      details: errorText,
    }
    try {
      // Try to parse the more specific error message from the API
      const parsedJson = JSON.parse(errorText)
      errorPayload.message = parsedJson.error || errorPayload.message
      errorPayload.details = parsedJson.details || errorPayload.details
    } catch (e) {
      // The error response was not JSON. The original payload is the best we can do.
    }
    // Throw an error with a stringified JSON payload to pass both message and details
    // to the `onError` callback.
    throw new Error(JSON.stringify(errorPayload))
  }

  return response
}

export default function NewProposalPage() {
  const [prompt, setPrompt] = useState("")
  const [alignment, setAlignment] = useState<{
    text: string
    color: string
  } | null>(null)

  // State to hold structured error information
  const [apiError, setApiError] = useState<{ message: string; details?: string } | null>(null)

  const { completion, input, handleInputChange, handleSubmit, isLoading, error } = useCompletion({
    api: "/api/generate-proposal",
    fetcher: customFetcher,
    onError: (e) => {
      console.error("useCompletion error received:", e)
      try {
        // Try to parse the structured error from our custom fetcher
        const errorPayload = JSON.parse(e.message)
        setApiError({
          message: errorPayload.message,
          details:
            typeof errorPayload.details === "string" ? errorPayload.details : JSON.stringify(errorPayload.details),
        })
      } catch (parseError) {
        // Fallback for generic errors that are not in our expected JSON format
        setApiError({ message: e.message || "An unknown error occurred." })
      }
    },
    onFinish: () => {
      setApiError(null)
    },
  })

  useEffect(() => {
    const savedPrompt = localStorage.getItem("grant_proposal_prompt")
    if (savedPrompt) {
      setPrompt(savedPrompt)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("grant_proposal_prompt", prompt)
  }, [prompt])

  useEffect(() => {
    if (completion) {
      localStorage.setItem("grant_proposal_completion", completion)
    }
  }, [completion])

  const handleActualFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setApiError(null) // Clear previous errors on new submission

    if (prompt.toLowerCase().includes("education")) {
      setAlignment({ text: "Alignment: Good", color: "text-green-600" })
    } else {
      setAlignment({
        text: "Alignment: Needs Review",
        color: "text-yellow-600",
      })
    }
    handleSubmit(e, { body: { prompt } })
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="container max-w-screen-lg mx-auto">
          <header className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Create New Proposal</h1>
            <p className="text-muted-foreground">
              Enter your program details below and let the AI assistant draft a proposal for you.
            </p>
          </header>

          <div className="grid gap-8">
            <Card className="shadow-soft border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Lightbulb className="mr-2 h-5 w-5 text-secondary" />
                  Your Project Details
                </CardTitle>
                <CardDescription>
                  Provide a summary of your project, its goals, and the need it addresses. The more detail, the better
                  the draft.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleActualFormSubmit}>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'Our project is an after-school coding club for 50 middle school students in downtown...'"
                    className="min-h-[150px] text-base bg-card text-card-foreground border-border"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Draft
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Display structured API errors */}
            {apiError && (
              <Card className="shadow-soft border-destructive bg-destructive/10">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
                    Error Generating Proposal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-destructive-foreground">{apiError.message}</p>
                  {apiError.details && (
                    <pre className="mt-2 text-xs text-destructive-foreground/80 bg-destructive/20 p-2 rounded-md overflow-x-auto">
                      <code>{apiError.details}</code>
                    </pre>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">
                    This may be due to OpenAI rate limits (Error 429) or an issue with the API key. Please check your
                    OpenAI account and usage.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Fallback for generic, non-API errors from the hook */}
            {error && !apiError && (
              <Card className="shadow-soft border-destructive bg-destructive/10">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
                    An Unexpected Error Occurred
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-destructive-foreground">{error.message}</p>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-soft border-border/60">
              <CardHeader>
                <CardTitle className="text-foreground">Generated Proposal Draft</CardTitle>
                <div className="flex justify-between items-center">
                  <CardDescription>
                    Review the AI-generated draft below. You can copy this text into an editor for refinement.
                  </CardDescription>
                  {alignment && <p className={`text-sm font-semibold ${alignment.color}`}>{alignment.text}</p>}
                </div>
              </CardHeader>
              <CardContent className="min-h-[200px] p-6 bg-accent/30 rounded-b-lg">
                {isLoading && (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
                {completion && !isLoading && (
                  <div
                    className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl max-w-none text-foreground"
                    dangerouslySetInnerHTML={{ __html: completion }}
                  />
                )}
                {!completion && !isLoading && (
                  <p className="text-muted-foreground text-center">Your generated proposal will appear here.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="py-6 px-4 md:px-6 border-t border-border/40 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} GrantPilot. All rights reserved.
      </footer>
    </div>
  )
}
