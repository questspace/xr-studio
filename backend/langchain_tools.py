from typing import Type

from langchain.tools import Tool, BaseTool
from langchain.utilities.google_search import GoogleSearchAPIWrapper
from pydantic import BaseModel, Field


class GoogleSearchToolInput(BaseModel):
    query: str = Field()


class GoogleSearchTool(BaseTool):
    name = "google_search"
    description = "Search for latest information and news on Google."
    args_schema: Type[BaseModel] = GoogleSearchToolInput

    def _run(self, query: str):
        print("Searching Google for: %s ", query)
        search = GoogleSearchAPIWrapper()
        results = search.results(query, num_results=10)
        return results