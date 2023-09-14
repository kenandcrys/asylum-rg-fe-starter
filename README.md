# Human Rights First: Asylum Report Generator

## North Star

- A search tool to give a user-friendly view into a large dataset of asylum case decisions.
- Similar to the [TRAC](https://trac.syr.edu/phptools/immigration/asylum/) database—a popular existing tool, but with many limitations.
  - Generate a table of results, a real-time visualization of outcomes, and a real-time graph to represent what the trend looks like over time.
  - Show a heatmap where users can map out e.g., “Here are the 10 asylum regions with the highest or lowest grant rates.”
  - Need to be able to download search results.

## Audiences

- Journalists
- Researchers
- General public (asylum seekers, activists, etc.)

## Users

- Administrators
  - Engineers who interact directly with infra (don’t need user auth)
  - Add/manage data
- Public Users
  - Don’t need to log in—just view and use the public web app
  - Search and filter asylum decision data by all columns (as well as any compound combinations)
  - Display calendar dates vs. fiscal years in data (display “month and year” and “fiscal year” as separate search)
  - Can view and filter on pre-populated geographic regions based on sets of countries for search parameters
  - View results in a table and any relevant graphs
  - View percentage of cases that were granted based on currently displayed results
  - Should be able to save or print reports, charts, and/or graphs generated from a query

## Resources

The following deployed site shows your exact deliverable and what you should be building:

- [Deployed Site](https://asylum-rg-fe.vercel.app/)

This is what the raw data looks like from HRF:

- [Sample Case Data](https://github.com/BloomTech-Labs/asylum-rg-fe-starter/blob/main/src/data/COW2021001887-I589Data.csv)
