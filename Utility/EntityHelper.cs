using System;
using System.Collections;
using System.Linq;

namespace Utility
{
    public static class EntityHelper
    {
        #region 相同字段快速赋值
        /// <summary>
        /// 相同类型名称属性快速赋值
        /// </summary>
        /// <typeparam name="TSource">被赋值对象类型</typeparam>
        /// <typeparam name="TDestination">获取属性值对象类型</typeparam>
        /// <param name="source">被赋值对象实例</param>
        /// <param name="destination">获取属性值对象实例</param>
        /// <param name="canNull">是否接受空值覆盖，true为接受，false为不接受，默认接受</param>
        /// <returns>赋值完成的对象实例</returns>
        public static TSource FastAssignment<TSource, TDestination>(this TSource source, TDestination destination, bool canNull = true)
        {
            Type sourceType = typeof(TSource);
            Type destinationType = typeof(TDestination);
            if (sourceType.IsPrimitive || destinationType.IsPrimitive)
            {
                return source;
            }
            if (source == null || destination == null)
            {
                return source;
            }
            var sourceProperty = sourceType.GetProperties();
            var destinationProperty = destinationType.GetProperties();
            if (sourceProperty.Length == 0 || destinationProperty.Length == 0)
            {
                return source;
            }
            foreach (var t in sourceProperty)
            {
                var item = destinationProperty.FirstOrDefault(u => u.Name.Equals(t.Name));
                if (item != null)
                {
                    if (t.CanWrite && item.CanRead && t.GetIndexParameters().Length == 0 && item.GetIndexParameters().Length == 0)
                    {
                        bool canNext = false;
                        if (t.PropertyType != item.PropertyType)
                        {
                            if (t.PropertyType.IsGenericType && t.PropertyType.ToString().Contains("System.Nullable") && item.PropertyType.IsPrimitive)
                            {
                                var propertyPara = t.PropertyType.GetGenericArguments();
                                if (propertyPara[0] == item.PropertyType)
                                {
                                    canNext = true;
                                }
                            }
                            else if (t.PropertyType.IsPrimitive && item.PropertyType.IsGenericType && item.PropertyType.ToString().Contains("System.Nullable"))
                            {
                                var propertyPara = item.PropertyType.GetGenericArguments();
                                if (propertyPara[0] == t.PropertyType)
                                {
                                    if (item.GetValue(destination, null) != null)
                                    {
                                        canNext = true;
                                    }
                                }
                            }
                        }
                        else
                        {
                            canNext = true;
                        }
                        if (canNext)
                        {
                            if (canNull)
                            {
                                t.SetValue(source, item.GetValue(destination, null), null);
                            }
                            else
                            {
                                object itemValue = item.GetValue(destination, null);
                                if (itemValue != null)
                                {
                                    t.SetValue(source, itemValue, null);
                                }
                            }
                        }
                    }
                }
            }
            return source;
        }
        #endregion

        #region 字符串默认值快速替换
        /// <summary>
        /// Null字符串替换为空
        /// </summary>
        /// <typeparam name="T">传入类型</typeparam>
        /// <param name="obj">传入参数</param>
        /// <returns></returns>
        public static T FastDefaultStringReplace<T>(this T obj)
        {
            try
            {
                if (obj == null)
                {
                    return default(T);
                }
                Type objType = typeof(T);
                if (objType.IsPrimitive)
                {
                    return obj;
                }
                else if (objType == typeof(string))
                {
                    return obj;
                }
                var objTypeInterface = objType.GetInterfaces();
                if (objTypeInterface.Any(u => u.FullName != null && u.FullName.Equals("System.Collections.IList")))
                {
                    IList objList = (IList)obj;
                    for (int i = 0; i < objList.Count; i++)
                    {
                        objList[i] = FastDefaultStringReplace(objList[i]);
                    }
                    return obj;
                }
                else if (objTypeInterface.Any(u => u.FullName != null && u.FullName.Equals("System.Collections.IDictionary")))
                {
                    IDictionary objDic = (IDictionary)obj;
                    foreach (var key in objDic.Keys)
                    {
                        objDic[key] = FastDefaultStringReplace(objDic[key]);
                    }
                    return obj;
                }
                var strProperty = objType.GetProperties();
                foreach (var t in strProperty)
                {
                    try
                    {
                        var item = t;
                        if (item.CanRead && item.CanWrite && item.GetIndexParameters().Length == 0)
                        {
                            var itemValue = item.GetValue(obj, null);
                            if (item.PropertyType == typeof(string))
                            {
                                if (itemValue == null)
                                {
                                    item.SetValue(obj, string.Empty, null);
                                    continue;
                                }
                            }
                            if (itemValue != null)
                            {
                                Type[] itemValueType;
                                try
                                {
                                    itemValueType = itemValue.GetType().GetInterfaces();
                                }
                                catch (Exception)
                                {
                                    continue;
                                }
                                if (itemValueType.Any(u => u.FullName != null && u.FullName.Equals("System.Collections.IList")))
                                {
                                    IList listObj = (IList)itemValue;
                                    for (int k = 0; k < listObj.Count; k++)
                                    {
                                        listObj[k] = FastDefaultStringReplace(listObj[k]);
                                    }
                                    item.SetValue(obj, listObj, null);
                                }
                                else if (itemValueType.Count(u => u.FullName != null && u.FullName.Equals("System.Collections.IDictionary")) > 0)
                                {
                                    IDictionary dicObj = (IDictionary)itemValue;
                                    foreach (var key in dicObj.Keys)
                                    {
                                        dicObj[key] = FastDefaultStringReplace(dicObj[key]);
                                    }
                                    item.SetValue(obj, dicObj, null);
                                }
                            }
                        }
                    }
                    catch (Exception)
                    {
                        // ignored
                    }
                }
                return obj;
            }
            catch (Exception ex)
            {
                string unused = ex.Message;
                return obj;
            }
        }
        #endregion
    }
}
