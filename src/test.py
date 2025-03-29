def calculate_h_index(citations):
    # Sort citations in descending order
    citations.sort(reverse=True)
    
    h_index = 0
    
    # Find the maximum h such that the researcher has at least h papers with h or more citations
    for i, citation in enumerate(citations):
        if citation >= i + 1:
            h_index = i + 1
        else:
            break
    
    return h_index

# Get user input for number of papers (n)
n = int(input("Enter the number of papers: "))

# Get citations for each paper in a single line, split and convert to integers
citations = list(map(int, input("Enter the citations for papers (space-separated): ").split()))

# Check if the input length matches the number of papers
if len(citations) != n:
    print(f"Error: You entered {len(citations)} citations, but expected {n} citations.")
else:
    # Calculate and print the H-index
    h_index = calculate_h_index(citations)
    print(f"The researcher's H-index is: {h_index}")
