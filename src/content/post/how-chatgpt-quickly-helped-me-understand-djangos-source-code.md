---
title: "How ChatGPT quickly helped me understand Django's source code"
publishDate: 2023-04-06
description: "An unexpectedly efficient session walking through Django's model field internals with ChatGPT — DeferredAttribute, contribute_to_class, and virtual fields."
---

I was reading Django's source code to design a custom model field. I've also read the specific documentation page for it. Then there was a class that I was struggling to understand its role. So I started investigating with ChatGPT.

Here is the absolutely mind-blowing conversation. It was just like opening many tabs on the browser, but always going directly to the right information. Unbelievable.

Also, to be able to share this with you I simply asked it to output the full conversation, without changing any words, formatted as markdown inside a single code block. It did, I copied to Joplin and printed it to pdf. 🤯

---

**Me:**

In Django model fields, what is the role of the class `DeferredAttribute`?

**AI:**

In Django, a `DeferredAttribute` is a class that is used to represent a deferred attribute on a model field.

When a Django model is defined, each field on the model is created as an instance of a field class, such as `CharField`, `IntegerField`, or `ForeignKey`. However, instead of creating the attribute for the field, Django creates an instance of `DeferredAttribute` for the field. This deferred attribute is then used to access the field's value when it is needed.

The reason for this deferred attribute is that it allows Django to defer the loading of certain fields until they are needed. This can be useful in situations where a model has a large number of fields, but only some of those fields are needed in a particular view or query. By deferring the loading of those unused fields, Django can reduce the amount of memory and processing power required to handle the request.

When a `DeferredAttribute` is accessed, Django will load the actual value of the field from the database and replace the `DeferredAttribute` instance with the actual value. This process is transparent to the user and happens automatically behind the scenes.

Overall, the role of the `DeferredAttribute` class is to provide a lightweight placeholder for fields on a Django model that can be loaded lazily when needed, helping to improve the performance of the application.

---

**Me:**

In Django model fields, what is the role of the `contribute_to_class` method?

**AI:**

In Django, the `contribute_to_class` method is a method defined by most field classes that is responsible for adding the field to the model class.

When a Django model is defined, each field on the model is created as an instance of a field class, such as `CharField`, `IntegerField`, or `ForeignKey`. After the field instance is created, the `contribute_to_class` method is called on the field instance, passing in the model class that the field belongs to as an argument.

The role of the `contribute_to_class` method is to perform the necessary setup steps to integrate the field into the model class. These steps might include:

* Setting the field's name on the model class

* Adding the field's database column to the model's database table schema

* Registering any database indexes or constraints associated with the field

* Adding any additional methods or attributes to the model class that are required to support the field.

For example, a `ForeignKey` field's `contribute_to_class` method might add a reverse relation to the related model, while a `CharField` might define methods for validating or formatting the field's value.

Overall, the `contribute_to_class` method is a crucial method for any Django field class, as it is responsible for integrating the field into the model class and ensuring that the field functions correctly within the Django ORM.

---

**Me:**

How can I use `contribute_to_class` to have a field composed of two other fields?

**AI:**

You can use the `contribute_to_class` method to create a custom field that is composed of two or more other fields. Here's an example implementation of a custom field that concatenates two other string fields:

```python
from django.db import models

class ConcatenatedField(models.CharField):
    def __init__(self, first_field_name, second_field_name, *args, **kwargs):
        self.first_field_name = first_field_name
        self.second_field_name = second_field_name
        super().__init__(*args, **kwargs)

    def contribute_to_class(self, cls, name, private_only=False, virtual_only=models.NOT_PROVIDED):
        super().contribute_to_class(cls, name, private_only, virtual_only)
        # Add a descriptor for the field
        setattr(cls, self.name, ConcatenatedFieldDescriptor(self))

class ConcatenatedFieldDescriptor:
    def __init__(self, field):
        self.field = field

    def __get__(self, instance, owner):
        if instance is None:
            return self.field
        first_field_value = getattr(instance, self.field.first_field_name)
        second_field_value = getattr(instance, self.field.second_field_name)
        return f"{first_field_value}{second_field_value}"
```

This custom `ConcatenatedField` class is a subclass of `CharField` and takes two additional arguments, `first_field_name` and `second_field_name`, which specify the names of the two fields to be concatenated. In the contribute\_to\_class method, the field is added to the model class using the `setattr` function.

The custom `ConcatenatedFieldDescriptor` class is a descriptor that is responsible for retrieving the values of the two fields and concatenating them together. It is used by the `ConcatenatedField` instance to provide a single concatenated value for the field.

To use this custom field in your model, you would define it like this:

```python
class MyModel(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    full_name = ConcatenatedField('first_name', 'last_name', max_length=100)
```

In this example, the `full_name` field is composed of the `first_name` and `last_name` fields. When you access the `full_name` attribute on an instance of `MyModel`, it will return the concatenated string of `first_name` and `last_name`.

---

**Me:**

What is the role of `private_only`?

**AI:**

The `private_only` parameter is used in Django's `contribute_to_class` method to control whether a field should be added as a public or private attribute of the model class.

By default, when a field is added to a model class using `contribute_to_class`, it is added as a public attribute with the same name as the field. For example, if you define a `CharField` named `my_field` on a model, you can access it as `my_instance.my_field.`

However, sometimes you may want to define a field that should not be accessed from outside the class, such as an internal implementation detail. In this case, you can set the `private_only` parameter to `True`, and the field will be added as a private attribute with a name that starts with an underscore (\_). For example, if you define a `CharField` named `my_field` with `private_only=True,` you can access it as `my_instance._my_field`.

Setting `private_only` to `True` can be useful in situations where you want to prevent external code from accessing or modifying a field that is used only for internal bookkeeping or implementation details. However, it can also make the code more difficult to understand or debug, since the field may not be immediately visible to external code.

Overall, the `private_only` parameter gives you finer-grained control over the visibility of fields in your model class, allowing you to create both public and private fields as needed.

---

**Me:**

What is the role of `virtual_only`?

**AI:**

The `virtual_only` parameter is used in Django's `contribute_to_class` method to indicate whether a field is a virtual or non-persistent field.

*Virtual fields* are fields that do not correspond to a database column and do not need to be stored in the database. Instead, their values are computed on-the-fly based on other data in the model or from external sources. Examples of virtual fields might include properties that calculate some value based on other fields or methods that generate data dynamically.

Non-virtual fields, on the other hand, are fields that correspond to a database column and are stored persistently in the database.

When a field is added to a model using `contribute_to_class`, it is added as a non-virtual field by default, meaning that a corresponding database column will be created for the field. However, if the `virtual_only` parameter is set to `True`, the field will be treated as a virtual field, and no corresponding database column will be created.

By default, the `virtual_only` parameter is set to `models.NOT_PROVIDED`, which means that the field's virtual status is not specified, and it will be treated as a non-virtual field. If you want to create a virtual field, you can set `virtual_only=True` when defining the field.

Here's an example of defining a virtual field using virtual\_only:

```python
class MyModel(models.Model):
    some_field = models.IntegerField()

    @property
    def computed_field(self):
        return self.some_field * 2

    class Meta:
        managed = False

MyModel.add_to_class('computed_field', models.IntegerField(virtual_only=True))
```

In this example, computed\_field is a virtual field that is defined as a property on the model class. By default, this property is not treated as a field by Django and does not appear in the model's database schema. However, we can use add\_to\_class to add a virtual field to the model and specify that it should be treated as a virtual field by setting `virtual_only=True`.

Overall, the `virtual_only` parameter gives you more control over how fields are treated by Django and allows you to define virtual fields that are not stored in the database.

---

**Me:**

What are the advantages of having a virtual field instead of just using a property?

**AI:**

While both virtual fields and properties can be used to compute values on-the-fly based on other data in the model or from external sources, virtual fields have some advantages over properties:

1. Improved performance: Virtual fields can be more performant than properties because they are cached in memory after the first access, whereas properties are computed on-the-fly every time they are accessed. This means that if you need to access a computed value multiple times in a single request/response cycle, a virtual field may be faster than a property.

2. Consistent interface: By using virtual fields, you can create a consistent interface for your model's data, including both data that is stored in the database and data that is computed on-the-fly. This can make your code easier to understand and maintain.

3. Compatibility with Django's ORM: Virtual fields are compatible with Django's ORM, which means that you can use them in queries, filters, and other database-related operations just like any other field. This can be especially useful if you need to sort or filter your data based on a computed value.

4. Integration with serialization: When you serialize a Django model instance, virtual fields will be included in the output just like any other field, whereas properties will not. This can be useful if you need to include computed values in your API responses.

Overall, while properties can be a useful tool for computing values on-the-fly, virtual fields have some advantages that make them a better choice in certain situations. If you need to compute a value that is frequently accessed or used in database-related operations, or if you want to create a consistent interface for your model's data, a virtual field may be a better choice than a property.

---

**Me:**

Can you give me an example of how a virtual field could be used in queries?

**AI:**

Sure! Here's an example of how a virtual field could be used in a query:

Let's say you have a Django model representing blog posts, with fields for the post's title, content, and creation date:

```python
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
```

Now, let's say you want to sort your blog posts by the number of comments they have. You could create a method on the Post model to compute the number of comments for a given post:

```python
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def num_comments(self):
        return self.comments.count()
```

In this example, num\_comments is a virtual field that computes the number of comments for a post. Note that we're using a related manager (self.comments) to get the number of comments for a post.

Now, let's say we want to sort our blog posts by the number of comments they have. We can do this using the virtual field num\_comments in a query:

```python
from django.db.models import Count

# Get all blog posts, sorted by number of comments
posts = Post.objects.annotate(num_comments=Count('comments')).order_by('-num_comments')
```

In this query, we're using the annotate method to add a virtual field num\_comments to each Post instance, which counts the number of comments for each post. We're then using the order\_by method to sort the blog posts by the num\_comments field in descending order.

Overall, virtual fields can be very useful in queries because they allow you to compute values on-the-fly and use them in database-related operations just like any other field. In this example, we were able to sort our blog posts by the number of comments they have without adding a separate field to our Post model.

---

**Me:**

But can't I build this same query without the virtual field just using annotations?

**AI:**

Yes, you can build the same query without using a virtual field, just by using the `annotate()` method to add an annotation representing the number of comments for each post, and then using that annotation in the `order_by()` method.

Here's an example of how you could write the same query without using a virtual field:

```python
from django.db.models import Count

# Get all blog posts, annotated with the number of comments for each post
posts = Post.objects.annotate(num_comments=Count('comments'))

# Sort the blog posts by the number of comments in descending order
posts = posts.order_by('-num_comments')
```

In this example, we're using the `annotate()` method to add an annotation `num_comments` representing the number of comments for each post. We're then using the `order_by()` method to sort the blog posts by the `num_comments` annotation in descending order.

So, it's possible to achieve the same result without using a virtual field. However, using a virtual field can make your code more expressive and easier to understand, especially if you need to use the computed value in multiple places in your code.

---

**Me:**

I can't see the difference between these two versions of the query. They look the same, and because of that I can't understand how useful a virtual field is specifically for queries.

**AI:**

You're right that in this particular example, the two versions of the query produce the same result, and the benefit of using a virtual field may not be immediately apparent.

However, the advantage of using a virtual field is that it allows you to define a computed property on your model that can be used just like any other field in your queries, without having to repeat the computation logic in each query. This can make your code more expressive and easier to maintain, especially if you need to use the computed value in multiple places in your code.

For example, let's say you wanted to display the number of comments for each post in your templates. With a virtual field, you can simply reference the `num_comments` property on each Post instance:

```python
{% for post in posts %}
  <h2>{{ post.title }}</h2>
  <p>{{ post.content }}</p>
  <p>Number of comments: {{ post.num_comments }}</p>
{% endfor %}
```

On the other hand, if you were using the annotated version of the query, you would need to repeat the annotation in your template code:

```python
{% for post in posts %}
  <h2>{{ post.title }}</h2>
  <p>{{ post.content }}</p>
  <p>Number of comments: {{ post.comments.count }}</p>
{% endfor %}
```

In this case, the difference is relatively minor, but for more complex computations, the benefits of using a virtual field can become more apparent.
