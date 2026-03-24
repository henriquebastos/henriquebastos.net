---
title: "The definitive guide to setup my Python workspace"
date: 2017-01-06
---

Have you ever focused on a task, but then needed to execute some quick command to move on and it didn’t work because your workspace was a mess?

When this happens you lose your flow and must first solve your tools’ problem, to then work on your original problem.

(╯°□°）╯︵ ┻━┻

That’s why I always try to fine-tune my processes to code like a chef, having the right tool available at the right time. Always one command away.

When you’re beginning, it’s pretty easy to set up your Python environment on Unix. But in time things can get messy due to multiple versions, interpreters, utilities and projects.

#### What are my setup requirements?

I have a few needs and restrictions:

1. I need CPython 2.7 and 3.6, but I want to be able to install other interpreters like PyPy and Anaconda;
    
2. Python3 must be the default for **EVERYTHING**, but easily step back when I need Python2.
    
3. I want **one** *Jupyter Notebook* that works both with Python2 and Python3, **and both are able to detect the active virtualenv** at jupyter notebook execution time.
    
4. I want **one** *iPython Console for Python3* and **one** *iPython Console for Python2*, so no need to install iPython on my projects’ virtualenvs.
    
5. I want useful programs written in Python *(ex: youtube-dl)* globally available on my system without contaminating the global interpreters and avoiding any library version issues.
    
6. I want to use virtualenvwrapper to develop my projects allowing me to change context/project quickly with **one** command.
    
7. I want this setup to be maintainable without adding too many things to PATH.
    

#### What is the best way to install Python on a Unix?

For me, [pyenv](https://github.com/yyuu/pyenv) is the best way to install Python on a Mac or Linux. Everything gets installed under your home directory, without tampering with the rest of the system. Besides that, it supports many different Python implementations such as PyPy, Anaconda, CPython, etc. All with **one** command.

First, we need to install [pyenv](https://github.com/yyuu/pyenv) and two of its extensions, [pyenv-virtualenv](https://github.com/yyuu/pyenv-virtualenv) and [pyenv-virtualenvwrapper](https://github.com/yyuu/pyenv-virtualenvwrapper). I use each one for different purposes:

1. I use *pyenv* to install Python interpreters;
    
2. I use *pyenv-virtualenv* to configure my “global environment”;
    
3. I use *pyenv-virtualenvwrapper* to work on my projects;
    

Use [Homebrew](http://brew.sh/) to install *pyenv* on a Mac. If you use another *OS*, [check out the documentation](https://github.com/yyuu/pyenv#installation).

```bash
brew install pyenv
brew install pyenv-virtualenv
brew install pyenv-virtualenvwrapper
```

With *virtualenvwrapper* all your *virtualenvs* are kept in the same directory and your projects’ code on another. My setup is:

```bash
# All virtualenvs will be on...
mkdir ~/.ve
# All projects will be on...
mkdir ~/workspace
```

It’s necessary to configure the *shell* to initialize *pyenv* when you start a terminal session. Put the lines below on your ~/.bashrc file:

```bash
export WORKON_HOME=~/.ve
export PROJECT_HOME=~/workspace
eval "$(pyenv init -)"
#pyenv virtualenvwrapper_lazy
```

1. Note that there is a # at the beginning of the last line to keep *pyenv-virtualenvwrapper* from starting at this first moment. We’ll get back to it later.
    
2. Also, note that I **did not** include the command *pyenv virtualenv init* in ~/.bashrc [unlike the documentation suggests](https://github.com/yyuu/pyenv-virtualenv#installation). This is on purpose: activating both extensions [causes conflicts](https://github.com/yyuu/pyenv-virtualenvwrapper/issues/28#issuecomment-177051559).
    

Now we must **restart the terminal session** closing its window and opening a new one.

The next step is to install **CPython 3.6.0** and **CPython 2.7.13**.

```bash
pyenv install 3.6.0
pyenv install 2.7.13
```

#### Resist the temptation to contaminate your global Python install

I frequently use programs written in Python. I like them to be available in all sessions **without activating any virtualenv**.

However I don’t like to mess with the global Python installation to avoid library conflict issues.

Another thing that I don’t like is installing Jupyter/iPython on each of my projects’ virtualenvs.

I like to have only **one** install of *Jupyter Notebook* , one of *iPython Console for Python3*, one of *iPython Console for Python2*, and other tools like [youtube-dl](https://pypi.python.org/pypi/youtube_dl), [rename](https://pypi.python.org/pypi/rename), [gnucash-to-beancount](https://pypi.python.org/pypi/gnucash-to-beancount), [rows](https://pypi.python.org/pypi/rows), [s3cmd](https://pypi.python.org/pypi/s3cmd), [fabric](https://pypi.python.org/pypi/Fabric/1.13.1), [mercurial](https://www.mercurial-scm.org/), etc.

This is where *pyenv-virtualenv* comes to play, with 4 *special* virtualenvs:

```bash
pyenv virtualenv 3.6.0 jupyter3
pyenv virtualenv 3.6.0 tools3
pyenv virtualenv 2.7.13 ipython2
pyenv virtualenv 2.7.13 tools2
```

*Jupyter* supports many *kernels*. This allows a single **Jupyter** install to create *notebooks* for Python2, Python3, R, Bash and many other languages. *At this time I only want to support Python2 and Python3*.

Let’s start with *Python3*:

```bash
pyenv activate jupyter3
pip install jupyter
python -m ipykernel install --user
pyenv deactivate
```

Then *Python2*:

```bash
pyenv activate ipython2
pip install ipykernel
python -m ipykernel install --user
pyenv deactivate
```

Note that when I install Jupyter on Python3 it will by default install iPython and the Kernel too. For Python2 I only need to install iPython and the Kernel. I’ll explain this better below.

Now let’s install tools that run on Python3:

```bash
pyenv activate tools3
pip install youtube-dl gnucash-to-beancount rows
pyenv deactivate
```

Now we install tools that do **not** run on Python3… but still run on Python2.

¯\\\_(ツ)\_/¯

```bash
pyenv activate tools2
pip install rename s3cmd fabric mercurial
pyenv deactivate
```

Finally, it’s time to make all *Python versions* and *special virtualenvs* work with each other.

`pyenv global 3.6.0 2.7.13 jupyter3 ipython2 tools3 tools2`

The above command establishes the PATH priority so scripts can be accessed in the right order **without activating any virtualenv**.

ヾ(⌐■\_■)ノ♪

To better understand the result, check out how the *shell* finds each command:

```bash
pyenv which python
/Users/henrique/.pyenv/versions/3.6.0/bin/python

pyenv which python2
/Users/henrique/.pyenv/versions/2.7.13/bin/python2

pyenv which jupyter
/Users/henrique/.pyenv/versions/jupyter3/bin/jupyter

pyenv which ipython
/Users/henrique/.pyenv/versions/jupyter3/bin/ipython

pyenv which ipython2
/Users/henrique/.pyenv/versions/ipython2/bin/ipython2

pyenv which youtube-dl
/Users/henrique/.pyenv/versions/tools3/bin/youtube-dl

pyenv which rename
/Users/henrique/.pyenv/versions/tools2/bin/rename
```

#### What about my projects’ virtualenvs?

I use *pyenv-virtualenvwrapper* to create my projects’ virtualenvs. This extension does very little: only fixes the *virtualenvwrapper* library to work correctly with the interpreters installed via *pyenv*.

Now **uncomment** the line #pyenv virtualenvwrapper\_lazy on your `~/.bashrc` and **restart the terminal**, closing its window and opening a new one.

When you start the new session *pyenv-virtualenvwrapper* will install the virtualenvwrapper’s dependencies if they’re not present.

Now you can simply use [virtualenvwrapper’s commands](http://virtualenvwrapper.readthedocs.io/en/latest/command_ref.html) and each virtualenv will be created using the Python interpreters installed via *pyenv*.

A few examples:

1. Say I want to start a new project *proj3* with Python3. Running `mkproject proj3` will create a *virtualenv with Python3* (default) at `~/.ve/proj3` and an empty project directory at `~/workspace/proj3`.
    
2. Now say I just opened the terminal and want to work on my new *proj3*. Running `workon proj3` will activate the virtualenv `~/.ve/proj3` and change the current directory to `~/workspace/proj3`.
    
3. Let’s say I just *cloned* a project called *proj2* which runs on Python2 at `~/workspace/proj2` and I need a virtualenv to work on it. Running `mkvirtualenv -a ~/workspace/proj2 -p python2 proj2` will create a *virtualenv with Python2* at `~/.ve/proj2` associating to it the project directory `~/workspace/proj2`. Then running `workon proj2` will activate the virtualenv and change the directory to the project’s path.
    

#### How to use Jupyter and iPython with my projects?

This was the main motivation to write this guide.

Both *Notebook* and *Console* were part of the *iPython* project, which, as the name suggests, was only about Python. But the *Notebook* evolution enabled it to become language agnostic, so developers decided to split the project into 2: [Jupyter](http://jupyter.org/) and [iPython](http://ipython.readthedocs.io)

Now *Jupyter* contains *Notebook*, while *iPython* contains *Console* and the **Python Kernel** which *Jupyter* uses to execute Python code.

I used to use an old iPython version and during a clumsy upgrade Jupyter stopped detecting the active virtualenv, so I couldn’t import its installed libraries.

Jupyter does not detect the active virtualenv: it’s the iPython instance that Jupyter initializes. The problem then is that iPython’s virtualenv detection code only runs in the *interactive shell mode*, but not in the *kernel mode*. [Check out the culprit](https://github.com/ipython/ipython/blob/master/IPython/core/interactiveshell.py#L676).

Besides that, the detection code only works properly if the active virtualenv’s Python version and the Python version running iPython are the same.

(&gt;ლ)

The solution is to customize iPython’s startup process. For that we need to create an *iPython profile* and install [a magic script I wrote to do the trick](https://gist.github.com/henriquebastos/270cff100cb303f3d74370489022446b):

```bash
ipython profile create
curl -L http://hbn.link/hb-ipython-startup-script > ~/.ipython/profile_default/startup/00-venv-sitepackages.py
```

With this, no matter the mode iPython starts, the virtualenv’s `site-packages` will be available in the `PYTHONPATH`.

Back to our *proj3*, after activating its virtualenv running `workon proj3`, you can simply execute `ipython` to run the interactive mode, or `jupyter notebook` to get all the fun.

Done. Now we’re set. Let’s hack! ^‿^

\[\]’s, [HB](http://henriquebastos.net/me)!