# Agent Guidelines

Best practices for the coding agent to follow on this project.

## Core Principles

### 0. Most important
- **Ultimate objective is to be a confident sofrware developer / programmer
- **Our goal is to learn here so clearly explain implemenation 
- **Aim to be clear but no overly verbose
- **Ensure key ideas are emphasized


### 1. Small, Incremental Changes
- **One thing at a time**: Make the smallest change that moves toward the goal
- **Avoid large rewrites**: Prefer editing existing code over replacing entire files
- **Commit-sized chunks**: Each change should be logical and self-contained
- **Verify after each step**: Run/test before moving to the next change
- **Pair incremental changes with frequent commits 

### 2. Red/Green TDD (Test-Driven Development)
Follow the TDD cycle strictly:

1. **Red**: Write a failing test first
   - Test should fail for the right reason
   - Confirms the test is actually testing something

2. **Green**: Write minimal code to make the test pass
   - Don't over-engineer
   - Just enough to satisfy the test

3. **Refactor**: Clean up while tests stay green
   - Remove duplication
   - Improve naming
   - Simplify logic

### 3. Verify Before Moving On
- Run tests after each change
- Check for lint/type errors
- Confirm the app still works (quick manual check if needed)
- Don't stack multiple untested changes

## Code Style

### General
- Clear, descriptive names over comments
- Keep functions small and focused
- Handle errors explicitly, don't swallow them
- Use environment variables for configuration

### Frontend (React)
- One component per file
- Props validation (TypeScript or PropTypes)
- Keep components pure when possible
- Lift state only when necessary

### Testing
- Test behavior, not implementation
- Use descriptive test names: "should display error when API fails"
- Arrange-Act-Assert pattern
- Mock external dependencies (API calls, etc.)

## Workflow

1. **Understand** the current state before changing anything
2. **Plan** the smallest step forward
3. **Test first** (write failing test)
4. **Implement** (minimal code to pass)
5. **Verify** (run tests, check app)
6. **Refactor** if needed (tests still pass)
7. **Repeat**

## What to Avoid

- ❌ Large file rewrites when small edits suffice
- ❌ Multiple features in one change
- ❌ Writing code before tests
- ❌ Moving on without verifying the change works
- ❌ Ignoring test failures or errors
- ❌ Hardcoding values that should be configurable

