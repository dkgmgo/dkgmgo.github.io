---
layout: post
title:  "An EM algorithm for a Mixture of Gamma distributions in Python"
date:   2026-04-29 00:00:00 +0800
mathjax: true
categories: python algorithm
---

Using the Expectation-Maximization algorithm to fit some given data with a mixture of Gamma distributions.

* TOC
{:toc}

## Introduction

I recently had came across mixture models in a soft clustering task for my work and the first thing that came to my mind instantly was Gaussian Mixture Model (GMM). There are many tutorials, a scikit-learn class and a lot of resources on the internet about it. So I tried it and I quickly noticed that is was not suit enough to fit my data. 

### Why Gaussian Mixture sometimes fail?

A gaussian component assumes:
- symmetry around the mean
- support on all real numbers
- light tails

This becomes problematic for data such as :
- latency measurements, time to failure
- rainfall amounts, transactions amounts
- distances, insurance claims
- and more...

Because these dataset are often:
- positive-only
- skewed
- multi-modal

A Gaussian Mixture can still fit theme but it may require too many components and may have unstable variances. For these kind of data a mixture of Gamma distribution is often a better choice because it matches the geometry of the data more naturally.


### The Gamma Distribution

A random variable $X$ follows a Gamma distribution with shape $\\alpha$ and rate $\\beta$ if its probability density function is :

$f(x; \\alpha, \\beta) = \\frac{\\beta^\\alpha}{\\Gamma(\\alpha)} x^{\\alpha - 1} e^{-\\beta x}, \\quad x > 0$ 
{: .displayMath}

The shape parameter $\\alpha$ controls the skewness, (as $\\alpha$ increases, the distribution tends to a gaussian) and the rate $\\beta$ controls the scale.

Exactly like a gaussian mixture, a mixture of $K$ Gamma distribution is defined as :

$p(x) = \\sum_{k=1}^K \\pi_k f(x; \\alpha_k, \\beta_k)$
{: .displayMath}

Where $\\pi_k$ are the mixing coefficients that sum to 1.


## The EM algorithm for Gamma Mixture

The EM algorithm is an iterative method to find maximum likelihood estimates (MLE) of parameters in statistical models. It has two common applications which are mixture models and unobserved data problems. Its core idea is the introduction of latent variables to simplify the optimization problem. For example in the case of misture models, the introduced latent variable tells us wich component generated each data point. The EM algorithm consists of two steps:

- the E-step (Expectation step) where we compute the expected value of the log-likelihood function with respect to the current estimate of the distribution of the latent variables.
- the M-step (Maximization step) where we maximize this expected log-likelihood with respect to the parameters of the model.

I recommend to read the paper [[^bilmes_em]] by Jeff Bilmes for detailed explanations and dirivations of the maths for Gaussian Mixture Models and Hidden Markov Models. I also made a paper presentation on it that you can find [here](/papers/icsi-tr-97-021). There is also this paper [[^almhana_em]] which explains the maths for the case of Gamma mixtures.

In this section, I will use what I learned from the paper [[^bilmes_em]] to derive the EM algorithm for a mixture of Gamma distributions and then I will implement it in Python.

### The setup

Let's say we have a dataset of size N : $X = \\{x_1, x_2, ..., x_N \\}$, supposedly drawn from a distribution $p$ parameterized by $\\Theta$. We want to find the parameters $\\Theta$ that maximize the likelihood of the data. 

We suppose the data are independent and identically distributed (i.i.d) so the likelihood can be written as :

$L(\\Theta \| X) = p(X \| \\Theta) = \\prod_{i=1}^N p(x_i \| \\Theta)$
{: .displayMath}

In the case of a mixture of K distributions, we have :

$p(x \| \\Theta) = \\sum_{k=1}^K \\pi_k p_k(x \| \\theta_k)$ 
{: .displayMath}
Where $\\pi_k$ are the mixing weights and $p_k$ are the component distribution parameterized by $\\theta_k$.

The log-likelihood of the incomplete data is then :

$\\log (L(\\Theta \| X)) = \\log(\\prod_{i=1}^N p(x_i \| \\Theta)) = \\sum_{i=1}^N \\log \\left( \\sum_{k=1}^K \\pi_k p_k(x_i \| \\theta_k) \\right)$
{: .displayMath}
wich is hard to optmize directly because of the log of the sum. By introducing a latent variable $Y$ that indicates which component generated each data point, we can write the complete data log-likelihood as :

$\\log (L(\\Theta \| X, Y)) = \\log(P(X, Y \| \\Theta)) = \\sum_{i=1}^N \\log(P(x_i \| y_i )P(y)) = \sum_{i=1}^N \\log (\\pi_{y_i} p_{y_i}(x_i \| \\theta_{y_i}))$
{: .displayMath}

### The E-step

Here we compute the Q function which is the expected value of the complete data log-likelihood.

$
\\begin{align}
Q(\\Theta \| \\Theta^{(t)}) &= \\mathbb{E}_{Y \| X, \\Theta^{(t)}} \\left[ \\log(P(X, Y \| \\Theta)) \\right]
\\end{align}
$
{: .displayMath}

### The M-step

### Python code

## References

[^bilmes_em]: Bilmes, J. (1997). A Gentle Tutorial of the EM algorithm and its application to Parameter Estimation for Gaussian Mixture and Hidden Markov Models (Technical Report No. TR-97-021). International Computer Science Institute (ICSI).

[^almhana_em]: J. Almhana, Z. Liu, V. Choulakian and R. McGorman, "A Recursive Algorithm for Gamma Mixture Models," 2006 IEEE International Conference on Communications, Istanbul, Turkey, 2006, pp. 197-202, doi: 10.1109/ICC.2006.254727.