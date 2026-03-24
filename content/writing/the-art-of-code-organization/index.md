---
title: "The Art of Code Organization"
date: 2023-04-27
---

As developers, we often find ourselves working on projects where the organization of code can greatly impact its maintainability and readability.

However, many developers tend to automatically follow patterns from frameworks or architectures without giving much thought to code organization, which can lead to potential issues down the line.

To address this problem, it's important to understand the different strategies for organizing code and how to balance them to achieve the best results.

In this blog post, we'll explore a key aspect of code organization and discuss the concepts of *affinity* and *similarity*, which can provide valuable insights into structuring your projects effectively.

## **What are Affinity and Similarity?**

By definition, *affinity* is a natural attraction between things, while *similarity* is the closeness of appearance to something else.

Let's illustrate this difference with a personal story:

When I got married, my wife and I had to learn to live together. She prides herself on being super organized, while I'm practical to the extreme. Our first dispute was over breakfast organization. My wife organized everything based on similarity (e.g., dairy cupboard, bread cupboard, etc.), while I preferred organizing by affinity (e.g., all breakfast ingredients in one cupboard). This example highlights the fundamental difference between the two strategies.

## **Organizing Code by Similarity:**

In software development, frameworks like Django suggest an organization by similarity. Files like `views.py`, `urls.py`, `models.py`, and `serializers.py` are all kept together, making it easy to notice the **similarity** between codes.

However, as your project grows, you may end up with large files containing similar elements that **don't relate** to each other. This can lead to opening multiple files when implementing new features or changing existing behaviors.

## **Organizing Code by Affinity:**

The alternative is organizing code by affinity, which means keeping related elements in the same file. By doing this, you keep codes used among themselves close together, making maintenance and adding new capabilities much more straightforward.

## **Balancing Both Strategies:**

Avoid simply repeating your framework patterns. Start by organizing your code by affinity and keep rearranging the code with each iteration.

When a code has an *affinity with many others*, it may be considered *generic* and not alike, and this is when organizing by similarity becomes helpful.

By focusing on the following symptoms and benefits, you can ensure a more streamlined and efficient coding experience:

### **Symptoms to watch for:**

1. **Too many imports:** Having an excessive number of imports may indicate that your code organization needs improvement.
    
2. **Importing several submodules of another package:** This can be a sign that the code's organization is not optimal, and you might need to reconsider the structure.
    
3. **Too many files open for the same task:** If you find yourself opening numerous files to work on a single task, it might be time to reorganize your code based on affinity.
    

### **Benefits of balancing affinity and similarity:**

1. **Improved maintainability:** By organizing related elements in the same file, you can make maintenance and the addition of new features more straightforward.
    
2. **Increased productivity:** Focusing on the simple, functional aspects of your project and reorganizing as needed helps maintain high productivity levels.
    
3. **Flexibility:** Adopting a combination of affinity and similarity strategies allows you to adjust your code organization as your project evolves, ensuring better adaptability.
    

## **Conclusion:**

Understanding the difference between organizing code by affinity and similarity can significantly impact your project's structure and maintainability.

By starting with an affinity-based organization and adapting as needed, you can ensure a more streamlined and efficient coding experience.